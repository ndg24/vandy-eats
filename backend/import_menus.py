import os
import datetime
from bs4 import BeautifulSoup
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Date, Meal, Station, MenuItem, DiningHall
from config import SQLALCHEMY_DATABASE_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Create tables if they don't exist
Base.metadata.create_all(engine)

def get_or_create(session, model, defaults=None, **kwargs):
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance
    else:
        params = dict((k, v) for k, v in kwargs.items())
        params.update(defaults or {})
        instance = model(**params)
        session.add(instance)
        session.commit()
        return instance

def parse_html_menu(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'lxml')
    table = soup.find('table', class_='table')
    if not table:
        print(f"No menu table found in {html_path}")
        return []
    items = []
    current_station = None
    for row in table.find_all('tr'):
        if 'cbo_nn_itemGroupRow' in row.get('class', []):
            div = row.find('div', role='button')
            if div:
                current_station = div.get_text(strip=True)
        elif 'cbo_nn_itemPrimaryRow' in row.get('class', []) or 'cbo_nn_itemAlternateRow' in row.get('class', []):
            cols = row.find_all('td')
            if len(cols) >= 3:
                name_cell = cols[1]
                name = name_cell.get_text(strip=True)
                items.append({
                    'station': current_station,
                    'name': name
                })
    return items

def import_menu(html_path, meal_name, date_str, dining_hall_name):
    session = SessionLocal()
    date_obj = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    date = get_or_create(session, Date, date=date_obj)
    meal = get_or_create(session, Meal, name=meal_name)
    dining_hall = get_or_create(session, DiningHall, name=dining_hall_name)
    menu_items = parse_html_menu(html_path)
    for item in menu_items:
        station = get_or_create(session, Station, name=item['station'])
        menu_item = MenuItem(
            name=item['name'],
            date=date,
            meal=meal,
            station=station,
            dining_hall=dining_hall
        )
        session.add(menu_item)
    session.commit()
    session.close()
    print(f"Imported {len(menu_items)} items from {html_path} for {meal_name} on {date_str} at {dining_hall_name}")

def main():
    base_dir = os.path.join(os.path.dirname(__file__), 'menus')
    meal_map = {'b': 'breakfast', 'l': 'lunch', 'd': 'dinner'}
    for hall in os.listdir(base_dir):
        hall_path = os.path.join(base_dir, hall)
        if not os.path.isdir(hall_path):
            continue
        for date_folder in os.listdir(hall_path):
            date_path = os.path.join(hall_path, date_folder)
            if not os.path.isdir(date_path):
                continue
            # Expect date_folder to be YYYY-MM-DD
            date_str = date_folder
            for meal_code, meal_name in meal_map.items():
                # Find *_<meal_code>.html file
                for file in os.listdir(date_path):
                    if file.endswith(f'_{meal_code}.html'):
                        html_path = os.path.join(date_path, file)
                        import_menu(html_path, meal_name, date_str, hall)

if __name__ == '__main__':
    main() 
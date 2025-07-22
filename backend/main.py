from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine, and_
from typing import List, Optional
from models import Base, MenuItem, Date, Meal, Station, DiningHall
from config import SQLALCHEMY_DATABASE_URL

app = FastAPI()

# Allow CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic response models
from pydantic import BaseModel

class MenuItemOut(BaseModel):
    id: int
    name: str
    date: str
    meal: str
    station: str
    dining_hall: str
    class Config:
        orm_mode = True

@app.get("/menu_items", response_model=List[MenuItemOut])
def get_menu_items(
    date: Optional[str] = Query(None, description="YYYY-MM-DD"),
    meal: Optional[str] = Query(None, description="breakfast/lunch/dinner"),
    dining_hall: Optional[str] = Query(None, description="dining hall name"),
    db: Session = Depends(get_db)
):
    query = db.query(MenuItem, Date, Meal, Station, DiningHall)
    query = query.join(Date, MenuItem.date_id == Date.id)
    query = query.join(Meal, MenuItem.meal_id == Meal.id)
    query = query.join(Station, MenuItem.station_id == Station.id)
    query = query.join(DiningHall, MenuItem.dining_hall_id == DiningHall.id)
    if date:
        query = query.filter(Date.date == date)
    if meal:
        query = query.filter(Meal.name == meal)
    if dining_hall:
        query = query.filter(DiningHall.name == dining_hall)
    results = query.all()
    # Flatten results for response
    return [
        MenuItemOut(
            id=mi.id,
            name=mi.name,
            date=d.date.isoformat(),
            meal=m.name,
            station=s.name,
            dining_hall=dh.name
        )
        for mi, d, m, s, dh in results
    ]

@app.get("/dining_halls", response_model=List[str])
def get_dining_halls(db: Session = Depends(get_db)):
    return [dh.name for dh in db.query(DiningHall).all()]

@app.get("/meals", response_model=List[str])
def get_meals(db: Session = Depends(get_db)):
    return [m.name for m in db.query(Meal).all()]

@app.get("/dates", response_model=List[str])
def get_dates(db: Session = Depends(get_db)):
    return [d.date.isoformat() for d in db.query(Date).all()] 
from sqlalchemy import Column, Integer, String, ForeignKey, Date as SQLDate
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class DiningHall(Base):
    __tablename__ = 'dining_halls'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    menu_items = relationship('MenuItem', back_populates='dining_hall')

class Date(Base):
    __tablename__ = 'dates'
    id = Column(Integer, primary_key=True)
    date = Column(SQLDate, unique=True, nullable=False)
    menu_items = relationship('MenuItem', back_populates='date')

class Meal(Base):
    __tablename__ = 'meals'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    menu_items = relationship('MenuItem', back_populates='meal')

class Station(Base):
    __tablename__ = 'stations'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    menu_items = relationship('MenuItem', back_populates='station')

class MenuItem(Base):
    __tablename__ = 'menu_items'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    date_id = Column(Integer, ForeignKey('dates.id'))
    meal_id = Column(Integer, ForeignKey('meals.id'))
    station_id = Column(Integer, ForeignKey('stations.id'))
    dining_hall_id = Column(Integer, ForeignKey('dining_halls.id'))
    date = relationship('Date', back_populates='menu_items')
    meal = relationship('Meal', back_populates='menu_items')
    station = relationship('Station', back_populates='menu_items')
    dining_hall = relationship('DiningHall', back_populates='menu_items')
    # Optionally add: allergens, attributes, etc. 
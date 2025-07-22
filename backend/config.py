import os

SQLALCHEMY_DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql+psycopg2://postgres:iam2neil@localhost:5432/menus_db'
) 
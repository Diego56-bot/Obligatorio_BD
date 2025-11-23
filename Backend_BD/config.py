from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "db")  # valor por defecto dentro de Docker
DB_NAME = os.getenv("DB_NAME")

DB_APP_USER = os.getenv("DB_APP_USER")
DB_APP_PASSWORD = os.getenv("DB_APP_PASSWORD")

DB_ADMIN_USER = os.getenv("DB_ADMIN_USER")
DB_ADMIN_PASSWORD = os.getenv("DB_ADMIN_PASSWORD")

DB_FUNC_USER = os.getenv("DB_FUNC_USER")
DB_FUNC_PASSWORD = os.getenv("DB_FUNC_PASSWORD")

DB_PART_USER = os.getenv("DB_PART_USER")
DB_PART_PASSWORD = os.getenv("DB_PART_PASSWORD")

SECRET_KEY = os.getenv("SECRET_KEY")

from datetime import timedelta


ACCESS_EXPIRES = timedelta(hours=1)


class Config:
    SECRET_KEY = 'a25b23dc-c06d-11eb-aa70-48a4720b50a4'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///sapBdi.db'

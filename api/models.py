from datetime import datetime
from api import db
from sqlalchemy_serializer import SerializerMixin


class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    date_of_birth = db.Column(db.String(20), nullable=False)
    address_line_1 = db.Column(db.String(120), nullable=False)
    address_line_2 = db.Column(db.String(120))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    pincode = db.Column(db.String(20), nullable=False)
    created_date = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)

    serialize_only = ('id',
                      'first_name',
                      'last_name',
                      'date_of_birth',
                      'address_line_1',
                      'address_line_2',
                      'city',
                      'state',
                      'country',
                      'pincode',
                      'created_date',
                      )

    def __repr__(self):
        return f"\nUsers('first_name = {self.first_name}',\
'last_name = {self.last_name}',\
'date_of_birth = {self.date_of_birth}',\
'address_line_1 = {self.address_line_1}',\
'address_line_2 = {self.address_line_2}',\
'city = {self.city}',\
'state = {self.state}',\
'country = {self.country}',\
'pincode = {self.pincode}',\
'created_date = {self.created_date}')"

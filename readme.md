# For Backend

## To Install all dependencies

pip3 install -r requirements.txt

## To Initialize a database

from api import db, create_app

db.create_all(app=create_app())

## To run backend server

python3 run.py

## To check users table

from api import create_app, db

app = create_app()

app.app_context().push()

from api.models import Users

Users.query.all()

## Curl request to take user entry from user

curl --location --request POST 'http://127.0.0.1:5000/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"first_name": "Akshay",
"last_name": "Jain",
"date_of_birth": "1994-12-10",
"address_line_1": "Address Line 1",
"address_line_2": "Address Line 2",
"city": "Bangalore",
"state": "Karnataka",
"country": "Bangalore",
"pincode": "560068"
}'

## Curl request to evaluate based on answers form users

curl --location --request POST 'http://127.0.0.1:5000/api/evaluate' \
--header 'Content-Type: application/json' \
--data-raw '{
"ques1": "Yes",
"ques2": "No",
"ques3": "Yes",
"ques4": "No",
"ques5": "Yes",
"ques6": "No",
"ques7": "Yes"
}'

## Curl request to get questions from backend

curl --location --request GET 'http://127.0.0.1:5000/api/questions'

# For Frontend

## To Install all dependencies

npm install

## To run app

npm run webpack
npm run start

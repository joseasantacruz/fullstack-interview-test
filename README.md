# fullstack-interview-test at Flat
App to resolve Fullstack Interview Test at [Flat](https://flat.mx/)

This README provides the instructions to rub the App.

## The test
The goal of the test is to build an API container around the git information from this project and a web application using the API and displaying the information. 

For more information visit the [original repository.](https://github.com/FlatDigital/fullstack-interview-test)

## Repo
To clone the repository:
- Install git dependencies
```
sudo apt install git
```
- We need to download the repository.
```
git clone https://github.com/joseasantacruz/fullstack-interview-test.git
```

## Configure BackEnd service 
To configure BackEnd service we need to:
- Go to project directory
```
cd fullstack-interview-test
```
- Install the database
```
sudo apt install postgresql postgresql-contrib
```
- Install some requirements
```
cd API_wrapper
sudo apt install python3-pip
pip install -r requirements.txt
sudo apt install uvicorn
sudo pip install fastapi
sudo pip install uvicorn
```
- Connect to database and create a new role
```
sudo su - postgres
psql
CREATE ROLE flat_user WITH LOGIN PASSWORD 'flattest';
ALTER ROLE flat_user CREATEDB;
\q
```
- With the new role create a new database 
```
psql -h localhost -p 5432 -d postgres -U flat_user
CREATE DATABASE flat_test; 
\q
```
- Connect to the new database and create a table
```
psql -h localhost -p 5432 -d flat_test -U flat_user
CREATE TABLE pulls (
    id serial PRIMARY KEY,
    author varchar (50),
    title varchar (100),
    description varchar (250),
    status varchar(10),
    base  varchar (100),
    compare varchar (100));
\q
```
- In a new terminal start the server
```
uvicorn main:app --reload
```
## Configure FrontEnd service 
To configure FrontEnd service we need to:
- Go to FrontEnd directory
```
cd fullstack-interview-test/web-app
```
- Install some requirements
```
sudo apt install npm
npm install
```
- Start the server
```
npm start
```
## Go to the Web App
Now lets go to the Web App.
Open in your browser the [Web App at http://localhost:3000.](http://localhost:3000/)


## Test code
To run a the tests:
- Go to project directory
```
cd fullstack-interview-test/API_wrapper
sudo apt install python-pytest
pip install pytest
```
- Run the tests
```
pytest
```

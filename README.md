# Storefront Backend Project

## Installation

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root to install all dependencies in package.json file.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Environment Variables

Create a `.env` file in the root directory with these environment variables.

```bash
PORT=3000
ENV=dev

# Set your database connection information here
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=j
PEPPER=BNDFJSbhjvdv
SALT=10
TOKEN_SECRET=VKJVKLHCVnbcsxmdjkfdue264
```

## Setting Databases

- After Installing Postgesql open powershell and login to postgres with username and password

```shell
psql -U postgres
```

- Create two databases one for development and one for testing.

```sql
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```

- run migration up using this command

```shell
db-migrate up
```

## Running & Testing the application

- To run the application just run the command

```shell
npm run dev
```

- To test the application just run the command

```shell
npm run test
```

# Next.js E-commerce Store
Created during UpLeveled Web Development Bootcamp Vienna September 2020.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and a small [PostgresQL](https://www.postgresql.org) database.


## Getting started

Clone the repository
```bash
git clone https://github.com/thorinaboenke/nextjs-ecommerce-store
```
in the created directory, run yarn or npm to install the dependencies
```bash
yarn
# or
npm
```

## Set up the database

Set up the database:

```sh
psql postgres
```

In there run

```sql
CREATE DATABASE <database_name>;
CREATE USER todos_next WITH ENCRYPTED PASSWORD '<database_name>';
GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <database_name>;
```
replacing <database_name> with the name you shoose for the database

Add the file .env in the project root, replacing <database_name> with the name you shoose for the databas.

```sh
PGHOST=localhost
PGDATABASE=<database_name>
PGUSERNAME=<database_name>
PGPASSWORD=<database_name>
```

Run the migrations

```sh
yarn dotenv ley up
```

## Development

start the development server:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy your own

Deploy using [Heroku](https://heroku.com):










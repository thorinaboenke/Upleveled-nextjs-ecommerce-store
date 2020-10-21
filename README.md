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

For setting up the database locally in this way you need to have PostgresQL installed.

```sh
psql postgres
```

In there run

```sql
CREATE DATABASE <database_name>;
CREATE USER <user_name> WITH ENCRYPTED PASSWORD '<user_password>';
GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <user_name>;
```
replacing <database_name>, <user_name>, <user_password> with the names you choose for the database


Then, to connect to the new database quit psql and reconnect
```sql
\q
psql -U <user_name> <database_name>
```

Add the file .env in the project root, replacing <database_name> with the name you choose for the database.
```sh
PGHOST=localhost
PGDATABASE=<password_name>
PGUSERNAME=<user_name>
PGPASSWORD=<user_password>
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










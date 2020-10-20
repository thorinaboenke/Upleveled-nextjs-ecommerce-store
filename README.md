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

For setting up the database locally in this way this way you need to have PostgresQL installed.

```sh
psql postgres
```

In there run

```sql
CREATE DATABASE <database_name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```
replacing <database name>, <user name>, <user password> with the names you choose for the database

Add the file .env in the project root, replacing <database_name> with the name you shoose for the database.
Then, to connect to the new database quit psql and reconnect

```sql
\q
psql -U <user name> <database name>
```

```sh
PGHOST=localhost
PGDATABASE=<password name>
PGUSERNAME=<user name>
PGPASSWORD=<user password>
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










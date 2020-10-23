# Next.js E-commerce Store
Created during UpLeveled Web Development Bootcamp Vienna September 2020.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and a [PostgresQL](https://www.postgresql.org) database.

## Features

With this application you can
- search and filter products
- add products to basket
- remove products from basket
- update products in basket
- leave reviews on product pages
- edit or delete reviews
- fill out shipment and payment infos (with form validation)

## Pages

- landingpage
- products overview
- single product page
- shopping cart
- checkout page
- thank you page

<img src="https://github.com/thorinaboenke/nextjs-ecommerce-store/blob/master/markdown/img1.png" width="1000" alt='landingpage'>
<img src="https://github.com/thorinaboenke/nextjs-ecommerce-store/blob/master/markdown/img2.png" width="1000" alt='product overview'>
<img src="https://github.com/thorinaboenke/nextjs-ecommerce-store/blob/master/markdown/img3.png" width="1000" alt='cart'>
<img src="https://github.com/thorinaboenke/nextjs-ecommerce-store/blob/master/markdown/img4.png" width="1000" alt='product'>

## Technologies used

- Next.js
- Postgres.js
- GraphQL
- Jest
- Cypress.io
- GitHub Actions

## Libraries used

- formik
- cookies-js
- nextcookies
- camelcase-keys
- ley
- dotenv

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

To set up the database first install [PostgresQL](https://www.postgresql.org) on your machine.
Connect to postgres
```sh
psql postgres
```

Create a new database and user
```sql
CREATE DATABASE <database_name>;
CREATE USER <user_name> WITH ENCRYPTED PASSWORD '<user_password>';
GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <user_name>;
```
replacing <database_name>, <user_name>, <user_password> with the names you choose for the database

To connect to the new database first quit psql and reconnect via the newly created user
```sql
\q
psql -U <user_name> <database_name>
```

Add the file .env in the project root, setting the environment variables to the names you choose for the database, user and password.
```sh
PGHOST=localhost
PGDATABASE=<database_name>
PGUSERNAME=<user_name>
PGPASSWORD=<user_password>
```

Run the migrations with ley

```sh
yarn dotenv ley up
```

## Testing

### Unit tests with Jest

```bash
yarn jest
```

### End to end tests with Cypress

```bash
yarn cypress start
```

## Deploying

### Development

start the development server:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploy via Heroku

- Create a new app via the dashboard
- Connect to the repository
- Install the Heroku Postres Add-on
- Deploy










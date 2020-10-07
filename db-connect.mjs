import postgres from 'postgres';
import dotenv from 'dotenv';

// configures the variables specified in the .env file
//these have to be names exactly
// PGHOST = localhost
// PGDATABASE
// PGUSER
// PGPASSWORD
dotenv.config();

const sql = postgres();

// one can also use the connection string for testing, i.e.
// const sql =  postgres('postgres://username:password@localhost:5432/database
//where username, password and database are the respective names for the database to connect)

// here retireve the information from the table and save it in a variable
const products = await sql`
SELECT * from products;
`;

console.log(products);
process.exit(0);

// run this scrip from the console with

import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);
// filename .mjs to use import syntax in file
// give information on how to connect
const sql = postgres();

//'postgres://username:password@localhost:5432/database'
//what comes back from sql is a promise

const users = await sql`
SELECT* from users

`;
console.log(users);
process.exit(0);

//how to run this code from the actual file?

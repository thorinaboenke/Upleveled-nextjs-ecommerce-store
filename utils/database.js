// import postgres from 'postgres';
// import dotenv from 'dotenv';
// dotenv.config();

export const products = [
  {
    id: '1',
    name: 'C-3PO',
    description:
      'Protocol droid intended to assist in etiquette, customs, and translation',
    price: 100,
    imgUrl: '/C3PO.png',
  },
  {
    id: '2',
    name: 'R2D2',
    description: 'Astromech droid for machanic and co-pilot duties',
    price: 200,
    imgUrl: '/R2D2.png',
  },
  {
    id: '3',
    name: 'BB8',
    description: 'Astromech droid',
    price: 350,
    imgUrl: '/BB8.png',
  },
  {
    id: '4',
    name: 'Probe',
    description: 'Recon droid for deep space exploration and reconnaissance',
    price: 80,
    imgUrl: '/probe.png',
  },
  {
    id: '5',
    name: 'Droideka',
    description:
      'Destroyer droid equipped with twin blasters and own shield generators',
    price: 450,
    imgUrl: '/droideka.png',
  },
  {
    id: '6',
    name: 'Battle Droid',
    description:
      'Trade Federation standard battle droid - Discount on bulk orders',
    price: 120,
    imgUrl: '/battledroid.jpg',
  },
  {
    id: '7',
    name: 'Fixit',
    description: 'FX-series medical assistant droid',
    price: 80,
    imgUrl: '/fx.jpg',
  },
  {
    id: '8',
    name: 'Surgeon Droid',
    description: '2-1B medical droid',
    price: 80,
    imgUrl: '/surgical.png',
  },
  {
    id: '9',
    name: 'D-L-K',
    description: 'Droid of unknown build, unknown origin - mostly scrap metal',
    price: 15,
    imgUrl: '/dalek.jpg',
  },
];

// console.log(process.env);
// filename .mjs to use import syntax in file
// give information on how to connect
// const sql = postgres();

//'postgres://username:password@localhost:5432/database'
//what comes back from sql is a promise
// export async function getUsers() {
//   const users = await sql`
// SELECT* from users

// `;
//   return users;
// }
// process.exit(0);

// how to run this code from

// on the file:

// export async function getServerSideProps(context) {
//   const {getUsers} = await import('.../../utlis/database to database');

// const users = await getUsers()

// return{
//   props:{
//     following: followingfromCookies,
//     users : users
//   }
// }
// }

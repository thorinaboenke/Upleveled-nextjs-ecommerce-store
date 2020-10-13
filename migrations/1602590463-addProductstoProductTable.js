const products = [
  {
    id: '1',
    name: 'C-3PO',
    description:
      'Protocol droid intended to assist in etiquette, customs, and translation',
    price: 100,
    url: '/C3PO.png',
  },
  {
    id: '2',
    name: 'R2D2',
    description: 'Astromech droid for mechanic and co-pilot duties',
    price: 200,
    url: '/R2D2.png',
  },
  {
    id: '3',
    name: 'BB8',
    description: 'Astromech droid',
    price: 350,
    url: '/BB8.png',
  },
  {
    id: '4',
    name: 'Probe',
    description: 'Recon droid for deep space exploration and reconnaissance',
    price: 80,
    url: '/probe.png',
  },
  {
    id: '5',
    name: 'Droideka',
    description:
      'Destroyer droid equipped with twin blasters and own shield generators',
    price: 450,
    url: '/droideka.png',
  },
  {
    id: '6',
    name: 'Battle Droid',
    description:
      'Trade Federation standard battle droid - Discount on bulk orders',
    price: 120,
    url: '/battledroid.jpg',
  },
  {
    id: '7',
    name: 'Fixit',
    description: 'FX-series medical assistant droid',
    price: 80,
    url: '/fx.jpg',
  },
  {
    id: '8',
    name: 'Surgeon Droid',
    description: '2-1B medical droid',
    price: 80,
    url: '/surgical.png',
  },
  {
    id: '9',
    name: 'D-L-K',
    description: 'Droid of unknown build, unknown origin - mostly scrap metal',
    price: 15,
    url: '/dalek.jpg',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO products ${sql(products, 'name', 'description', 'price', 'url')};
	`;
};

exports.down = async (sql) => {
  for (const product in products) {
    await sql`
	DELETE FROM products WHERE
	name = ${product.name} and
	description = ${product.description};
	`;
  }
};

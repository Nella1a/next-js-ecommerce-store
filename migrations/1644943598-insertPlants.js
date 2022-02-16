const plants = [
  {
    name: 'Monstera Deliciosa',
    price: 17.95,
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    name: 'Ficus Lyrata',
    price: 9.95,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at elit libero.',
  },
  {
    name: 'Pilea Peperomioides',
    price: 12.95,
    description: 'Vivamus at elit libero.',
  },
  {
    name: 'Calathea Orbifolia',
    price: 26.95,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
];

exports.up = async (sql) => {
  await sql`
INSERT INTO plants ${sql(plants, 'name', 'price', 'description')}

`;
};

exports.down = async (sql) => {
  for (const plant of plants) {
    await sql`
DELETE FROM plants
	WHERE
	 name = ${plant.name} AND
	price = ${plant.price} AND
	description = ${plant.description}

`;
  }
};

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
INSERT INTO plants
 (name, price, description)
 VALUES
 ('Monstera Deliciosa',17.95,'Monstera are species of evergreen tropical vines and shrubs that are native to Central America. They are famous for their natural leaf-holes, which has led to the rise of their nickname, Swiss Cheese Plant.'),
 ('Ficus Lyrata',9.95,'Needs Bright, Filtered Light. Will rapidly deteriorate in dim lighting.Keep soil evenly moist at all times. (about 2-3x per week)  Do not overwater or leave plant sitting in water.'),
 ('Pilea Peperomioides',12.95,'An easy plant to care for. Like most of our favorite indoor house plants, Pilea prefers bright, indirect light. Too much direct sun will scorch the round leaves.Water about once a week, or when the soil is nearly dry. Keep your plant in a well draining pot to avoid letting the roots sit in water.'),
 ('Calathea Orbifolia',26.95,'The Calathea orbifolia is a flowering species of plant in the family Marantaceae. The perennial plants are native to tropical forests in Central and South America, Asia, and Africa. Outdoors, calatheas grow on the forest floor, where they thrive in shaded, warm, humid environments.')

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

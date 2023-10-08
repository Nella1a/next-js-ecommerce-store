exports.up = async (sql) => {
  await sql`
INSERT INTO products
 (title, price, descr, slug)
 VALUES
 ('Monstera Deliciosa',17.95,'Monstera are species of evergreen tropical vines and shrubs that are native to Central America. They are famous for their natural leaf-holes, which has led to the rise of their nickname, Swiss Cheese Plant.','monstera-deliciosa'),
 ('Ficus Lyrata',9.95,'Needs Bright, Filtered Light. Will rapidly deteriorate in dim lighting.Keep soil evenly moist at all times. (about 2-3x per week)  Do not overwater or leave plant sitting in water.','ficus-lyrata'),
 ('Pilea Peperomioides',12.95,'An easy plant to care for. Like most of our favorite indoor house plants, Pilea prefers bright, indirect light. Too much direct sun will scorch the round leaves.Water about once a week, or when the soil is nearly dry. Keep your plant in a well draining pot to avoid letting the roots sit in water.', 'pilea-peperomioides'),
 ('Calathea Orbifolia',26.95,'The Calathea orbifolia is a flowering species of plant in the family Marantaceae. The perennial plants are native to tropical forests in Central and South America, Asia, and Africa. Outdoors, calatheas grow on the forest floor, where they thrive in shaded, warm, humid environments.','calathea-orbifolia')
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM products
`;
};

exports.up = async (sql) => {
  await sql`
	CREATE TABLE product_categories(
		product_id integer REFERENCES products(id),
		category_id integer REFERENCES categories(id),
		CONSTRAINT product_categories_pk PRIMARY KEY(product_id, category_id)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE product_categories
	`;
};

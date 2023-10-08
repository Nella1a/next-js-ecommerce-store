exports.up = async (sql) => {
  await sql`
	CREATE TABLE product_categories(
		product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
		category_id integer NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
		CONSTRAINT product_categories_pk PRIMARY KEY(product_id, category_id)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE product_categories
	`;
};

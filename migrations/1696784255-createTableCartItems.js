exports.up = async (sql) => {
  await sql`
 CREATE TABLE cart_items(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
	quantity integer,
	created_at TIMESTAMPTZ DEFAULT NOW()
 )
 `;
};

exports.down = async (sql) => {
  await sql`
	 DROP TABLE cart_items
	`;
};

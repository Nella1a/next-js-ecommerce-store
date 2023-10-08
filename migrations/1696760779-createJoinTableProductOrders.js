exports.up = async (sql) => {
  await sql`
	CREATE TABLE product_orders(
		product_id integer NOT NULL REFERENCES products(id),
		order_id integer NOT NULL REFERENCES orders(id),
		CONSTRAINT product_orders_pk PRIMARY KEY (product_id, order_id)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE product_orders
	`;
};

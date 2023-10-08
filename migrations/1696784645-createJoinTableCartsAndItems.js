exports.up = async (sql) => {
  await sql`
 CREATE TABLE carts_and_items(
	cart_id integer NOT NULL REFERENCES carts(id),
	cart_item_id integer NOT NULL REFERENCES cart_items(id),
	CONSTRAINT carts_and_items_pk PRIMARY KEY (cart_id, cart_item_id)

 )
 `;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE carts_and_items
	`;
};

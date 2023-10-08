exports.up = async (sql) => {
  await sql`
	ALTER TABLE orders
	ADD status_id integer REFERENCES order_status(id);
	`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE orders
	DROP COLUMN status_id;
	`;
};

exports.up = async (sql) => {
  await sql`
CREATE TABLE shipping_address(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id integer REFERENCES users(id) ON DELETE CASCADE,
	address_line varchar(255),
	city varchar(255),
	zip_code varchar(255),
	country varchar(255),
	company varchar(255)
)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE shipping_address
	`;
};

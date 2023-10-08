exports.up = async (sql) => {
  await sql`
	CREATE TABLE order_status(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(60) NOT NULL
	)`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE order_status
	`;
};

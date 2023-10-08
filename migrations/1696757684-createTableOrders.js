exports.up = async (sql) => {
  await sql`
	CREATE TABLE orders(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		quantity integer NOT NULL,
		user_id integer NOT NULL REFERENCES users(id),
		total_price DECIMAL(10,2) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE orders

	`;
};

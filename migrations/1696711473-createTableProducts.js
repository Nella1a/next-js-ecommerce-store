exports.up = async (sql) => {
  await sql`
	CREATE TABLE products(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title varchar(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	descr text NOT NULL,
	slug varchar(50)
);
	`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE products`;
};

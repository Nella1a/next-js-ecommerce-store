exports.up = async (sql) => {
  await sql`
	CREATE TABLE  Plants (
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name varchar(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	description text NOT NULL
);
	`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE plants`;
};

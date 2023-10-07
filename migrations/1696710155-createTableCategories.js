exports.up = async (sql) => {
  await sql`
	CREATE TABLE categories(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		best_for_beginners boolean,
		pet_friendly boolean,
		easy_care boolean
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE categories
	`;
};

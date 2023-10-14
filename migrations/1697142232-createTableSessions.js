exports.up = async (sql) => {
  await sql`
	CREATE TABLE sessions(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		token varchar NOT NULL UNIQUE,
		expires timestamp NOT NULL DEFAULT NOW() + INTERVAL '12 hours',
		user_id integer REFERENCES users (id) ON DELETE CASCADE

	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE sessions
	`;
};

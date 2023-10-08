exports.up = async (sql) => {
  await sql`
	CREATE TABLE users(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		email varchar(30) NOT NULL UNIQUE,
		password_hash varchar(60) NOT NULL,
		username varchar(30),
		first_name varchar(50),
		last_name varchar(50),
		role_id integer REFERENCES user_roles(id) ON DELETE CASCADE ON UPDATE CASCADE
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE users CASCADE
	`;
};

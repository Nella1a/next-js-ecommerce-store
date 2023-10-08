exports.up = async (sql) => {
  await sql`
	CREATE TABLE carts(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		session_id integer REFERENCES user_sessions(id) ON DELETE CASCADE,
		created_at TIMESTAMPTZ DEFAULT NOW()
	)
	`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE carts
`;
};

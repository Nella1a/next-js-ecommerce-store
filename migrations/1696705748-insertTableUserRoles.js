exports.up = async (sql) => {
  await sql`
	INSERT INTO user_roles(role_name)
	VALUES
		('admin'),
		('user')

	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM user_roles
	`;
};

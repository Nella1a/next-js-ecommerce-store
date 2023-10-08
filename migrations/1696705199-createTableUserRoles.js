exports.up = async (sql) => {
  await sql`
	CREATE TABLE user_roles(
		id SERIAL PRIMARY KEY,
		role_name varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE user_roles
 `;
};

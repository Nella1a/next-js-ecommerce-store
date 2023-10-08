exports.up = async (sql) => {
  await sql`
	CREATE TABLE users_payment(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		card_type_id integer,
		cardnumber integer,
		date_expire DATE

	)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE users_payment
`;
};

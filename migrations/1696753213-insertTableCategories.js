exports.up = async (sql) => {
  await sql`
 INSERT INTO categories(name)
	VALUES
	('best for beginners'),
	('pet friendly'),
	('easy care'),
	('plants')

 `;
};

exports.down = async (sql) => {
  await sql`
 DELETE FROM categories
 `;
};

exports.up = async (sql) => {
  await sql`
 INSERT INTO product_categories(product_id,category_id)
 VALUES
 (1, 4),
 (2, 4),
 (3, 4),
 (4, 4),
 (1,3),
 (1,1),
 (4,2),
 (3,3)
 `;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM product_categories
	`;
};

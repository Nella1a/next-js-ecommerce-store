exports.up = async (sql) => {
  await sql`
	INSERT INTO order_status(name)
	VALUES
	('new'),
	('in process'),
	('ready for dispatch'),
	('dispatched'),
	('delivered'),
	('invoiced'),
	('paid'),
	('returned'),
	('closed')
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM order_status
	`;
};

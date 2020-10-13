exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS reviews (
		review_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
		product_id INTEGER NOT NULL ,
		user_id INTEGER,
		rating INTEGER NOT NULL CHECK (rating>=1 AND rating<=5),
		review_text TEXT
);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE IF EXISTS reviews;`;
};

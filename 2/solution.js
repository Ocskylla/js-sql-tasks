import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (articles) => {
  const ids = [];
  const sql = postgres(config);
  for (const article of articles) {
    const result = await sql`INSERT INTO articles (title, description) VALUES (${article.title}, ${article.description}) RETURNING id`;
    ids.push(result[0].id);
  }
  await sql.end()

  return ids;

};
// END

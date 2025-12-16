import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

export default async (book) => {
  // BEGIN (write your solution here)
  const sql = postgres(config);
  await sql `INSERT INTO books ${sql(book)}`;
  await sql.end()
  // END
};

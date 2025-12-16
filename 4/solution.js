import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (user, roomNumber, price) => {
  const sql = postgres(config);

  try {
    await sql.begin(async (sql) => {
      const userResult = await sql`
        INSERT INTO users (username, phone) VALUES (${user.username}, ${user.phone}) RETURNING id`;
      const userId = userResult[0].id;

      const roomResult = await sql`SELECT id FROM rooms WHERE room_number = ${roomNumber} AND status = 'free'`;

      if (roomResult.length === 0) {
        throw new Error(`Комната ${roomNumber} недоступна`);
      }

      const roomId = roomResult[0].id;

      await sql`UPDATE rooms SET status = 'reserved' WHERE id = ${roomId}`;

      await sql`INSERT INTO orders (user_id, room_id, price) VALUES (${userId}, ${roomId}, ${price})`;
    });

  } catch (error) {
    throw error;

  } finally {
    await sql.end();
  }
};
// END

const { db } = require('@vercel/postgres');
// const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    // const createTable = await client.sql`
    // ALTER TABLE games ADD CONSTRAINT player2Id_userId FOREIGN KEY (player2Id) REFERENCES users(Id) 
    // `;
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS matches (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      player1Score int NOT NULL,
      player2Score int NOT NULL,
      date DATE NULL
      );
  `;

    console.log(`Created links before games and users table`);

    // Insert data into the "users" table
    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     return client.sql`
    //     INSERT INTO users (id, name, email, password)
    //     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   }),
    // );

    // console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedUsers(client)
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

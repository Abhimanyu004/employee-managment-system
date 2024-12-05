import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.HOST!,
  user: process.env.USER!,
  password: process.env.PASSWORD!,
  database: process.env.DATABASE!,
});

async function initializeDataBase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST!,
      user: process.env.USER!,
      password: process.env.PASSWORD!,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS employee`);
    await connection.query('USE employee');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees (
        first_name VARCHAR(255) NOT NULL,
        second_name VARCHAR(255) NOT NULL,
        emp_id VARCHAR(10) NOT NULL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_no CHAR(10) NOT NULL,
        dept ENUM('HR', 'Engineering', 'Marketing', 'Finance', 'Sales') NOT NULL,
        doj DATE NOT NULL,
        role VARCHAR(100) NOT NULL 
      );
    `);

    console.log('Database and table initialized');
    await connection.end();
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
}
initializeDataBase();

export default pool;

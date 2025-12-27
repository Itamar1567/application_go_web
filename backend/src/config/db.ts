import mysql from 'mysql2/promise';

if(!process.env.DB_HOST) { throw new Error("Missing DB host"); }
if(!process.env.DB_USER) { throw new Error("Missing DB user"); }
if(!process.env.DB_PASS) { throw new Error("Missing DB pass"); }
if(!process.env.DB_NAME) { throw new Error("Missing DB name"); }

export const dbConnection = mysql.createPool({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings: true

});
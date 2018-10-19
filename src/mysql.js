const mysql      = require('mysql2');
const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = require('../db.config');
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : DB_HOST,
  database : DB_NAME,
  user     : DB_USER,
  password : DB_PASS,
});

pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.exports = {
  sendMessage: async ({ userId, username, type, text, channelId }) => {
    try {
      await pool.promise().query(`insert into messages(userId, username, type, text, channelId) values(${userId}, "${username}", "${type}", "${text}", ${channelId})`);
    } catch (err) {
      if (err) throw err;
      console.log(err);
    }
  },
  getMessages: async (channelId) => {
    try {
      const [result] = await pool.promise().query(`select * from messages where channelId=${channelId}`);
      return result;
    } catch (err) {
      if (err) throw err;
      console.log(err);
    }
  },
};

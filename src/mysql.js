const mysql      = require('mysql2');
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'user',
  password : 'pass',
  database : 'db',
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

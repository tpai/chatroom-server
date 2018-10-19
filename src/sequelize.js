const fs = require('fs');
const path = require('path');
const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = require('../db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    host: DB_HOST,
  },
);

const db = {};
const modelFilePath = path.resolve(__dirname, '../models');

fs
  .readdirSync(modelFilePath)
  .filter(file => file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize['import'](path.join(modelFilePath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

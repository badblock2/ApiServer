const config = require('../config/environments');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        freezeTableName: true,
        operatorsAliases: {
          $and: Sequelize.Op.and,
          $or: Sequelize.Op.or,
          $eq: Sequelize.Op.eq,
          $gt: Sequelize.Op.gt,
          $lt: Sequelize.Op.lt,
          $lte: Sequelize.Op.lte,
          $like: Sequelize.Op.like
        }
    }
);

const User = sequelize.define('user', {
    name: Sequelize.STRING
});

module.exports = {
    sequelize: sequelize,
    User: User
}
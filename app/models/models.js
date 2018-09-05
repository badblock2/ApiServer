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
        define: {            
            charset: 'utf8'
        },        
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

const StockItem = sequelize.define('stock_item', {
    Code: {type: Sequelize.STRING(20), primaryKey: true},
    Name: Sequelize.STRING(80),
    Price: Sequelize.FLOAT,
    ChangeAmount: Sequelize.FLOAT,
    ChangeRatio: Sequelize.FLOAT
});

const MarketIndex = sequelize.define('market_index', {
    Code: {type: Sequelize.STRING(20), primaryKey: true},
    Name: Sequelize.STRING(80),
    Price: Sequelize.FLOAT,
    ChangeAmount: Sequelize.FLOAT,
    ChangeRatio: Sequelize.FLOAT
});

module.exports = {
    sequelize: sequelize,
    StockItem: StockItem,
    MarketIndex: MarketIndex
}
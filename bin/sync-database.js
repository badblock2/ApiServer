const models = require('../app/models/models');

module.exports = () => {
    return models.sequelize.sync({force: true});
}
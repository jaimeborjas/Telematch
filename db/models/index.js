const { User, UserSchema } = require('./user.model');
const { UserInfo, UserInfoSchema } = require('./userInfo.model');

/**
 *  Inits all of the DB Models into the sequelize instance
 * @param sequelize sequelize instance
 */

function setupModels(sequelize) {
    // inits models and schema
    User.init(UserSchema, User.config(sequelize)); // Inits 'users' table
    UserInfo.init(UserInfoSchema, UserInfo.config(sequelize)); // Init 'customers' table
    
    // inits relations
    User.associate(sequelize.models);
    UserInfo.associate(sequelize.models);
}

module.exports = setupModels;
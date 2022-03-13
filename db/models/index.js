const { User, UserSchema } = require('./user.model');
const { UserInfo, UserInfoSchema } = require('./userInfo.model');
const { Connection, ConnectionsSchema } = require('./connection.model');

/**
 *  Inits all of the DB Models into the sequelize instance
 * @param sequelize sequelize instance
 */

function setupModels(sequelize) {
    // inits models and schema
    User.init(UserSchema, User.config(sequelize)); // Inits 'users' table
    UserInfo.init(UserInfoSchema, UserInfo.config(sequelize)); // Init 'customers' table
    Connection.init(ConnectionsSchema, Connection.config(sequelize)); // Init 'connections' table
    
    // inits relations
    User.associate(sequelize.models);
    UserInfo.associate(sequelize.models);
    Connection.associate(sequelize.models);
}

module.exports = setupModels;
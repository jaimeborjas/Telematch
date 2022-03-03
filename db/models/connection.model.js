const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const CONNECTION_TABLE = 'connections';
const USER_TABLE = 'users';

// User Schema in the Database with all of its constrains
const ConnectionsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    connectionId: {
        field: 'connection_id',
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}
// Customer class model it is used to initialize the mdoel in the sequalize instance
class Connection extends Model {
    // Describes relations with other tables
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: CONNECTION_TABLE,
            modelName: 'Connection',
            timestamps: true
        }
    } 
}

module.exports = { CONNECTION_TABLE, ConnectionsSchema, Connection }
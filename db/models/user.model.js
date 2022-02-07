const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';
// User Schema in the Database with all of its constrains
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'student'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}
// Customer class model it is used to initialize the mdoel in the sequalize instance
class User extends Model {
    // Describes relations with other tables
    static associate(models) {
        // models
        this.hasOne(models.Customer,{
            as: 'customer',
            foreignKey: 'userId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    } 
}

module.exports = { USER_TABLE, UserSchema, User }
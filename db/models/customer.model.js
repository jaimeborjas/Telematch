const { Model, DataTypes, Sequelize } = require('sequelize');

const {USER_TABLE} = require('./user.model')

const CUSTOMER_TABLE = 'customers';
// Customer Schema in the Database with all of its constrains
const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING
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
    }
}
// Customer class model 
class Customer extends Model {
    static associate(models) {
        // models
        this.belongsTo(models.User, {as: 'user'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    } 
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }
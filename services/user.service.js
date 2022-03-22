// @ts-nocheck
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
  static _userServiceInstance = null;

  //Singleton of the user service. do not call constructor instead call getInstance method
  static getInstance() {
    if (UserService._userServiceInstance === null) {
      UserService._userServiceInstance = new UserService();
    }
    return UserService._userServiceInstance;
  }
  // Create a new user [TO DO => how to create a user depending on the type]
  async create(data) {
    try {
      const newUser = await models.User.create(data, {
        include: ['userInfo'],
      });
      delete newUser.dataValues.password;
    } catch (error) {}

    return newUser;
  }
  // Takes an id and updates the object with the changes
  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    if ('userInfo' in changes) {
      const userInfo = await models.UserInfo.findOne({
        where: {
          userId: id,
        },
      });
      const newUserInfo = await userInfo.update(changes.userInfo);
      res.dataValues.userInfo = newUserInfo.dataValues;
    }
    return res;
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
  }

  // Deletes the object with the given id
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: [
        {
          model: models.UserInfo,
          as: 'userInfo',
        },
        {
          model: models.User,
          as: 'connections',
          include: ['userInfo'],
          attributes: {
            exclude: ['password', 'Connection'],
          },
        },
      ],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
  // Returns all users in the fake database once we figure it out the database we will do lookups in this function
  async findAll() {
    const res = await models.User.findAll({
      include: [
        {
          model: models.UserInfo,
          as: 'userInfo',
        },
        {
          model: models.User,
          as: 'connections',
          attributes: {
            exclude: ['password', 'Connection'],
          },
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });
    return res;
  }

  async createConnection(data) {
    const { userId, connectionId } = data;
    const connection = await models.Connection.create({ userId, connectionId });
    return { connection, connection2 };
  }
}

module.exports = UserService;

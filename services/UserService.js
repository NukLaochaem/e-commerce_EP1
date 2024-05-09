var crypto = require("crypto");
const { Op } = require("sequelize");

class UserService {
  constructor(db) {
    this.db = db.sequelize;
    this.User = db.User;
  }

  async findUserByEmail(email) {
    return this.User.findOne({ where: { email } });
  }

  async createUser(
    firstname,
    lastname,
    username,
    email,
    password,
    address,
    telephonenumber
  ) {
    const salt = crypto.randomBytes(16).toString("hex");

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    const user = await this.User.create({
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      password: hashedPassword,
      salt: salt,
      address: address,
      telephoneNumber: telephonenumber,
    });
    return user;
  }

  async findUser(usernameOrEmail, password) {
    const user = await this.User.findOne({
      where: {
        [Op.or]: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return null;
    }

    const hashedPassword = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
      .toString("hex");

    return hashedPassword === user.password ? user : null;
  }
}

module.exports = UserService;

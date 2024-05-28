var crypto = require("crypto");
const { Op } = require("sequelize");

class UserService {
  constructor(db) {
    this.db = db.sequelize;
    this.User = db.User;
  }

  async findUserByEmailOrUsername(email, username) {
    const userByEmail = await this.User.findOne({ where: { email } });
    const userByUsername = await this.User.findOne({ where: { username } });

    return userByEmail || userByUsername;
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
      RoleId: 2,
      MembershipId: 1,
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

  async updateUserMembership(userId) {
    const user = await User.findByPk(userId);
    if (user) {
      let membership;
      if (user.purchaseCount >= 30) {
        membership = await Membership.findOne({ where: { name: "Gold" } });
      } else if (user.purchaseCount >= 15) {
        membership = await Membership.findOne({ where: { name: "Silver" } });
      } else {
        membership = await Membership.findOne({ where: { name: "Bronze" } });
      }

      if (membership) {
        user.membershipId = membership.id;
        await user.save();
      }
    }
  }

  async userPurchase(userId, purchaseCount) {
    const user = await User.findByPk(userId);
    if (user) {
      user.purchaseCount += purchaseCount;
      await user.save();
      await updateUserMembership(userId);
    }
  }
}

module.exports = UserService;

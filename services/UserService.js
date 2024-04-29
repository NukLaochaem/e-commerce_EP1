class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
  }

  async create(username, email, password) {
    try {
      const user = await this.User.create({
        UserName: username,
        Email: email,
        Password: password,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async findByUsername(username) {
    return await this.User.findOne({ where: { Username: username } });
  }

  async verifyPassword(user, password) {
    if (user && user.Password) {
      return user.Password === password;
    }
    return false;
  }
}

module.exports = UserService;

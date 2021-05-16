const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Stage extends Model {
  static init(sequelize) {
    super.init(
      {
        initials: Sequelize.STRING,
        name: Sequelize.STRING,
        content: Sequelize.TEXT,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Stage;

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  // user.associate = (models) => {
  //   user.hasMany(models.Category);
  // };

  return user;
};

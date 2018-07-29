module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('Project', {
    project: DataTypes.STRING,
  });

  project.associate = (models) => {
    project.belongsTo(models.User);
    project.hasMany(models.Section);
  };

  return project;
};

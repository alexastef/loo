module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("review", {
    review_id: DataTypes.INTEGER,
    cleanliness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
  });
  return Review;
};

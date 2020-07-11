module.exports = function(sequelize, DataTypes) {
    let bathroomReview = sequelize.define("bathroom_review", {
        review_id: DataTypes.INTEGER
    });
    return bathroomReview;
  };
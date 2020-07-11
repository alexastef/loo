module.exports = function (sequelize, DataTypes) {
    let bathroomReview = sequelize.define("bathroom_review", {
        review_id: DataTypes.INTEGER
    });

    bathroomReview.associate = function (models) {
        bathroomReview.belongsTo(models.Bathroom, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return bathroomReview;
};
const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: "Post",
            tableName: "posts",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){
        db.Post.belongsTo(db.User, {foreignKey : "user_id", targetKey: "id"});
        // db.Post.belongsTo(db.User, {foreignKey : "nickname", targetKey: "user_name"});
        db.Post.hasMany(db.Cmt, { foreignKey : "post_num", sourceKey : "id" });
    }
}

module.exports = Post;
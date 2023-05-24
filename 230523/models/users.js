const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            // 컬럼의 내용
            user_id : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true
            },
            user_pw : {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            user_name : {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            user_level : {
                type: Sequelize.STRING(10)
            }
        }, {
            // 테이블의 내용
            sequelize,
            timestamps : true,
            underscored : false,
            modelName: "User",
            tableName: "users",
            paranoid : false,
            charset : "utf8",
            collate: "utf8_general_ci"

        });
    }

    static associate (db){
        db.User.hasMany(db.Post, { foreignKey : "user_id", sourceKey : "id" });
        // db.User.hasMany(db.Post, { foreignKey : "nickname", sourceKey : "user_name" });
        db.User.hasMany(db.Cmt, { foreignKey : "user_num", sourceKey : "id" });
    }
}

module.exports = User;
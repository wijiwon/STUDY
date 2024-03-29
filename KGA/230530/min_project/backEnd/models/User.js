const Sequelize = require("sequelize");

class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id : {
                type: Sequelize.STRING(20),
                allowNull : false
            },
            user_pw : {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            user_name : {
                type: Sequelize.STRING(10)
            },
            user_img: {
                type: Sequelize.STRING(100)
            }
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "User",
            tableName : "users",
            paranoid : false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
}

module.exports = User;
const Sequelize = require("sequelize");

class Cmt extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            text : {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        },{
            sequelize,
            timestamps: true,
            modelName: "Cmt",
            tableName: "cmts",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }

    static associate(db){
        db.Cmt.belongsTo(db.User, {foreignKey : "user_num", targetKey: "id"});
        db.Cmt.belongsTo(db.Post, {foreignKey : "post_num", targetKey: "id"});
    }
}

module.exports = Cmt;
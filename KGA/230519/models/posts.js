const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize){
        // 첫 번째 매개변수: 컬럼의 내용 / 두 번째 매개변수: 테이블의 내용
        return super.init({
            msg: {
                type : Sequelize.STRING(100),
                allowNull : false
            }
        },{
            sequelize,
            timestamps: true,
            modelNameL : "Post",
            tableName: "posts",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static associate(db){
        // 1 : N - 예) 하나의 유저가 여러 개의 글을 만드는 경우


        // 1 : N 관계
        // belongsTO 메소드를 사용해서 user에 id를  foreignkey로 연결한다.
        // 유저의 id가 따라갈 키. 참조키는 user_id
        db.Post.belongsTo(db.User, { foreignkey : "user_id", targetKey : "id"});
    }
}

module.exports = Post;
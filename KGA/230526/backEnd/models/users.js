const Sequelize = require("sequelize");

class User extends Sequelize.Model{
    static init(seq){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            age : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user_id : {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            user_pw : {
                type: Sequelize.STRING(64),
                allowNull: true
            }
        }, {
            sequelize : seq,
            timestamps : true,      // 추가 시간, 수정 시간 자동 생성
            underscored : false,    // 카멜 케이스 할건지 유무 설정
            modelName : "User",     // 노드 프로젝트에서 사용할 이름(조회했을 때 보임)
            tableName : "users",    // 데이터베이스 테이블의 이름
            paranoid : false,       // 삭제 시간 표기 유무
            charset : "utf8",       // 인코딩 방식
            collate: "utf8_general_ci"
        })
    }

    static associate(db){
        db.User.hasMany(db.Post, {foreignKey : "user_id", sourceKey: "id"})
    }

}

module.exports = User;
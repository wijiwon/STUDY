const Sequelize = require("sequelize");

// User클래스에 시퀄라이즈 안의 Model클래스를 상속 시켜준다.
class User extends Sequelize.Model {
    static init(sequelize){
        // super: 상속 받은 부모의 함수를 실행 init 실행시켜 반환
        // init 메소드: 첫 번째 매개변수 - 컬럼에 대한 설정 값이 들어간다.
                    // 두 번째 매개변수 - 테이블 자체 설정 값이 들어간다.
        return super.init({
            // 컬럼에 대한 설정
            // name 컬럼
            name : {
                // VARCHAR === STRING
                type: Sequelize.STRING(20),
                // allowNull: null을 허용할지 여부를 결정
                allowNull : false,
                // unique: 고유키로 사용할 것인지. 중복되는 않는 값
                unique : true,
                // primaryKey: 고유키로 설정할 것인지 유무
                // primaryKey : true
            },
            age : {
                // INT === INTEGER
                type : Sequelize.INTEGER,
                allowNull : false
            },
            msg: {
                // TEXT === TEXT
                type : Sequelize.TEXT
            }
        },{
            // 테이블의 자체 설정
            // 매개변수로 전달받은 sequelize 작성 해주고
            sequelize,
            // 테이블에 rol 추가 했을 때, 생성시간과 업데이트 시간을 표기 해준다.
            // created_at과 updated_at 이라는 컬럼이 자동으로 추가된다.
            // 우리가 row추가했을 때 시간을 기록해주고 수정했을 때도 시간을 기록해준다.
            timestamps : true,
            // 표기법을 바꿔준다. 기본적으로 스네이크 표기법으로 되어있는데 
            // 스네이크 표기법 -> 카멜 표기법으로 바꿀지 여부를 결정한다.
            // ex. create_at -> createAt
            underscored: false,
            // 모듈의 이름을 설정한다. 노드 프로젝트에서 사용.
            modelName: "user",
            // 테이블의 이름을 설정한다. 왠만하면 추가될 테이블의 이름을 복수형으로 설정하자.
            tableName: "users",
            // paranoid를 true로 설정하면 deleted_at이라는 컬럼도 함께 생성된다.
            // deleted_at: row를 삭제해도 값이 남아있고, deleted_at항목에 삭제 시간이 생성된다.
            paranoid : false,
            // 인코딩 방식이다. 필수로 작성해줘야하는 것!
            charset : "utf8",
            // 인코딩 방식이다. 필수로 작성해줘야하는 것!
            collate : "utf8_general_ci"
        });
    }
    static associate(db){
        // 1 : N - 예) 하나의 유저가 여러 개의 글을 만드는 경우


        // 1 : N 관계
        // 시퀄라이즈에서 1:N 관계를 hasMany메소드로 정의해준다.
        // hasMany메소드는 테이블의 관계를 정의해준다.
        // sourceKey: user테이블 안에 어떤 키를 foreignkey와 연결해줄지
        // hasMany메소드의 첫 번째 매개변수: 넘긴 테이블이 foreignkey 연결이 되고 이름은 user_id다
        db.User.hasMany(db.Post, { foreignkey : "user_id", sourceKey : "id"});
    };
};

module.exports = User;
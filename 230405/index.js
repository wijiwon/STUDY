// 프로토타입
//자바스크립트의 객체는 프로토타입을 상속 받는다.
//프로토타입은 객체의 원형

// Object.prototype

function Car(model, color, speed){
    this.model = model;
    this.color = color;
    this.speed = speed;
    this.accel = function(){
        this.speed -= 10;
    }
}

//생성자 함수로 동적할당해서 생성

let temp = new Car("벤츠", "흰색", 200);
let temp2 = new Car ("모닝", "검정", 200);

console.log(temp);
console.log(temp2);


function Car1(m,c,s){
    this.model = m;
    this.color = c;
    this.speed = s;
    this.speedUP = function(){
        this.speed += 10;
        return this.speed;
        
    }
}

let temp3 = new Car1("마티즈", "레드", 150);
//batter키 true값 추가
temp3.batter = true;
temp3.speedUP = function(){
    this.speed +=20;
    return this.speed;
}

console.log(temp3);
temp3.speedUP();
console.log(temp3);


//이런 방식은 객체에 새 속성을 추가 할 수 있는데
//원형에 추가는 할 수 없다.


function Car2(m,c,s){
    this.model = m;
    this.color = c;
    this.speed = s;
}

// 프로토 타입의 정의 기본 형식
// 객체명.prototype.메서드 = function(){

// }
//이 원형을 가진 객체들은 전부 프로토 타입으로 추가한 메소드를 사용할 수 있다.
//생성자에 의해 생성된 모든 객체는 생성자 함수의 모든 속성과
//메소드를 상속 받는다.
//각 객체는 상속된 속성과 메서드를 메모리에 저장해놓고
//동일한 메서드는 메모리에 저장을 하고 중복저장을 피한다.
//생성자 함수에 메서드를 정의하지 않고 생성자 외부에 별도의 
//메서드를 정의해서 사용하는 방법이 프로토타입이다.

//car 함수의 프로토타입으로 speedUP 메소드를 정의해서 사용
Car2.prototype.speedUP = function(){
    this.speed += 20;
    return this.speed;

}

Car2.prototype.speedDown = function(){
    this.speed -= 20;
    return this.speed;
}

let temp4 = new Car2('봉고', '검정', 100);
let temp5 = new Car2('다마스', '검정', 100);
console.log(temp4.speedUP());    //결과: 120

//stop이라는 메서드를 객체에 추가 (프로토타입 추가 X)
temp4.stop = function(){
    this.speed = 0;
    return this.speed;
}


//생성자 함수로 만든 객체들에게 전부 메서드를 추가해야 할 경우에
//프로토 타입으로 원형에 메서드를 추가해주자.

console.log(temp4.stop());    //결과: 0
// console.log(tem2.stop());    //결과: error


Car2.prototype.stop = function(){
    this.speed = 0;
    return this.speed;
}

console.log(temp4.stop());    //결과: 0
console.log(temp5.stop());    //결과: error


String.prototype.replaceOf = function(){
    console.log("나는 프로토 타입으로 추가됐어");
    return;
}

//문자열의 원형은 String이고
"가나다".replaceOf();
console.log("가나다".replace("가","나"))    //문자열 "가,나,다"에 replace 메소드 사용으로 "가" 대신 "나"가 출력
//생성자 함수
//객체를 함수로 만들 때 많이 사용한다.
//객체를 생성할 때 사용하는 함수
//문법
function createObj(_name, _atk, _def, _speed){          // createObj가 생성자 함수다.
    this.name = _name;
    this.dtk = _atk;
    this.def = _def;
    this.speed = _speed;
}

//이런 모양으로 생성자 함수를 만들고 
//이 함수를 가지고 객체를 생성하는 방법
//새로운 키워드 'new' 사용
// new : 동적 할당 - 새로운 객체를 생성하기 위한 메모리 공간을 동적으로 사용할 수 있도록 할당해준다.
//new 키워드를 사용하묜 빈 객체를 만들어주고 생성자 함수를 실행시켜서 this 객체를 참조. (this가 빈 객체)
//키값을 추가하고 객체를 만들어준다.

//하나의 객체를 사람이라 표현했을 때
/*let temp = {
    name: "이름";
    age: "나이";
    
}*/   // 한 사람을 temp라는 객체로 만들어 놓고 해당 사람의 정보를 키와 값으로 만들어서 하나의 오브젝트화 시킨다. (물건도 마찬가지)

//객체를 편하게 동적으로 할당할 수 있다.
let obj = new createObj("고블린", 100, 100, 10);
console.log(obj);
let obj2 = new createObj("트롤", 200, 100, 10);
console.log(obj2);

//존역변수만으로 프로그램을 관리하기에는 너무 힘들기 때문에
//오브젝트화 객체화 시킨다.
// 개발자는 객체를 잘 다뤄야한다.
let obj_name = "고블린";
let obj_atk = 100;

//첫 번째 객체의 이름을 나타낸다.
obj.name


//obj._name: 객체의 값에 접근하는 방법
console.log(obj_name);
//obj["name"] : 객체의 값에 접근하는 방법
console.log(obj["name"]);


let arr = [1,2,3,4];
arr.forEach((i) => {
    console.log(i);
});
for (let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}


//for in
// 자동완성 했을 때 Object라고 적혀있는 변수의 우리가 보고싶은 객체를 넣어준더. 
for(const key in obj){
    console.log(key);           //key: 객체안에 있는 키값이 key 변수에 순서대로 담겨 콘솔로 노출된다.

    console.log(obj);           //obj: 객체가 키 값의 수 만큼 노출된다.
    console.log(obj[key]);
    /*이렇게 쓰면 안된다. 객체안에 있는 key값을 찾는 방식이다.
    console.log(obj.key); */
          
}



//페이지에 자바스크립트를 이용해서 동적인 기능을 넣어보자

//BOM: 브라우저 객체. 브라우저의 기능들을 객체로 사용할 수 있게 해준것.
alert("dfsdf");
console.log(window);

//onload 메소드: 브라우저의 랜딩이 끝나고 보여줄 준비가 되었을 때 실행되는 함수. 문서 랜더링을 끝내고 실행되는 함수
//window.onload라는 메소드의 키값으로 함수 값을 전달
window.onload = function(){
    console.log("나 다그렸어");
}

//DOM(문서 객체 모델): 문서를 객체의 모양으로 만든 것.
//문서의 접근을 가능하게 해준다.

//DOM은 페이지에 있는 태그들을 객체로 표현한 것.

//document: 객체에서 태그를 선택하는 방법이다.
//객체를 이용해서 찾고싶은 태그를 자바스크립트로 가져와서 사용할 수 있다.
console.log(document)


//태그 선택자들

//ID ------------------------------------------------------------------------------------
//getElementById: 메소드로 태그의 아이디를 찾아서 태그를 가져올 수 있다.
let div2 = document.getElementById("div1");

//아이디 값이 있는 태그는 그냥 변수처럼 사용해도 된다.
//아이디는 한개만 태그에 하나만! 같은 아이디가 있으면 안된다. 중복되지 않게 해야한다.
let div3 = div1;

//querySelector 만능이다. 이 친구만 사용해도 된다.
let div4 = document.querySelector('#div1') //아이디(#) div1을 찾아줘


console.log(div2);
console.log(div3);
console.log(div4);
// ---------------------------------------------------------------------------------------


//CLASS ----------------------------------------------------------------------------------
// console.log(class_div2);        //아이디는 변수처럼 사용할 수 있지만 클래스는 할 수 없다. 클래스는 중복될 수 있도록 만들었기 때문이다.

let div5 = document.querySelector('.class_div2');   // querySelector: 문서를 읽다가 첫번째로 발견된 태그 하나만 가져온다.
console.log(div5);

//querySelectorAll: 해당하는 전체 태그들을 가져온다.
let divArr = document.querySelectorAll('.class_div2');
console.log(divArr);
console.log(divArr[3]);
//배열의 형태로 가져온다.

// ---------------------------------------------------------------------------------------




// 태그 이름 선택자 -----------------------------------------------------------------------
//querySelector: 변수의 내용은 CSS선택를 넣어준다.
//문자열을 넣어주면 된다.
let div6 = document.querySelector('div');


// ---------------------------------------------------------------------------------------

//우리는 웹 페이지를 만들 수 있는 능력이 생겼어!

//텍스트를 태그에 넣어주고 싶다!
// div1
div1.innerHTML = "<div>나 태그임</div>";    // 브라우저에서 읽어서 해석하기 때문에 div, ul 등이 해석된다.
div1.innerHTML = "<ul><li>나 태그임</li></ul>";    // 브라우저에서 읽어서 해석하기 때문에 div, ul 등이 해석된다.

//div1 태그의 내용을 추가할 수 있다. <div> 여기에 내용이 추가되는 것이다. </div>
console.log(div1.innerHTML);


let div7 = document.querySelector('.class_div2');
div7.innerHTML = "나 class_div2 태그 중 첫번째야"


let div8 = document.querySelectorAll('.class_div2');
div8[3].innerHTML = "난 class_div2를 가진 4번째 태그야"

// ---------------------------------------------------------------------------------------


//버튼에 기능을 넣어보자

//버튼을 누르면 함수를 실행시켜보자.
function btnFn(){
    let class_div = document.querySelectorAll('.class_div2'); //class_div2 클래스를 가지고 있는 태그들을 class_div2변수에 배열로 담고
    class_div.forEach(function(i){      //그 배열을 forEach로 순회하면서 아이템을 매개변수로 받았다.
        i.innerHTML = "이 문자로 통일! 너 버튼 눌렀지?";
    })

}
//html에
//생성자 함수를 만들고
let objArr = [];



function create(name, age, content){        //객체를 만들 수 있다.
    this.name = name;
    this.age = age;
    this.content = content;
}


function divBtn(){              // 버튼 누르면 실행시킬 기능
    console.log("나 눌렸어");     
    addArr();
    //화면을 업데이트 하기 위해 만든 함수
    dro();
}


function addArr(){      //객체를 배열에 추가하는 기능
    //new 키워드로 빈 객체를 만들고 함수에서 this로 그 객체를 참조해서
    //name 키에는 값을 매개변수로 "이름"을
    //age 키에는 값을 매개변수로 10을
    //content 키에는 값을 매개변수로 "나 컨텐츠"를 전달해서 빈 객체에 키 값을 추가해준다.
    //obj라는 변수에 만들어진 객체를 넣어준다.
    
    //input 태그명을 querySelectorAll 메소드 매개변수로 전달해서 
    //input 태그들을 배열로 가져와서 inputs 변수에 담아놓고
    let inputs = document.querySelectorAll("input");
    console.log(inputs);
    //input 태그는 value라는 키 값이 있다.
    //input에 입력한 값이 value키에 값으로 담긴다.
    console.log(inputs[0].value);
    console.log(inputs[1].value);
    console.log(inputs[2].value);

    let obj = new create(inputs[0].value, inputs[1].value, inputs[2].value);
    objArr.push(obj);
    console.log(objArr);
    //객체와 배열은 래퍼런스 타입이기 때문에 값이 아니라 키 값의 주소를 들고 있다.
    //일반변수(원시타입)는 값을 가리키는 주소를 가리키지만 obj의 경우는 값을 
    //주소를 들고 있는 개념. 주소를 console에 찍기 때문에 주소를 바라보면 마지막으로 변한 값을 확인 할 수 있다.
    //주소는 값을 가리키는 친구. 
}


//무언가를 그려주는 함수
function dro(){
    let text = "";      // 렌더링 하기 전에 문자열 초기화
    objArr.forEach(function(i){
        // +=: 원래 있는 값에 추가를 시켜준다. 값을 덧붙인다.
        // 예. +=2 / 원래 있는 값에 2씩 증가
        text += `<li>이름: ${i.name} 나이: ${i.age} 내용: ${i.content}</li>`
    });
    console.log(text);
    //text 지역변수는 여기서 사용하고 끝
    document.querySelector('#talbles').innerHTML = text;
}


//실습
/*  페이지에 표를 만들고 (ul사용 table X)
    input에 이름 나이 성별 내용 안경유무(bool/true,false)를 작성해서 받고
    내용이 표에 한줄 한줄 추가되도록 작성 */
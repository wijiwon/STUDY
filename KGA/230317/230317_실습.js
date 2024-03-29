let arr = [];           // 내용을 받기 위한 배열선언

function base(name, age, sex, glass){       // 객체를 만들기 위한 함수
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.glass = glass;
}

function buttjs(){              // 버튼을 누르면 실행할 함수
    add();
}


function add(){                 // input에 내용 추가
    let ip = document.querySelectorAll("input");

    let add_in = new create(ip[0].value, ip[1].value, ip[2].value, ip[3].value);
    arr.push(add_in);
    console.log(add);
}

function show(){
    let vlaue = "";         //값을 초기화
    arr.forEach(function(i){
        value += `<li>이름: ${i.name} 나이: ${i.age} `
    })
}

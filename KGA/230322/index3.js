//쿠키랑 세션, 로컬 스토리지
//쿠키는 많이 들어봤는데.
//쿠키는 해당 pc에 남아있다.
//쿠키: 웹사이트를 방문하고 사용자의 pc에 기록할 간단한 데이터이다.
//pc에 저장해두었다가 값을 호출해서 사용할 수 있다.
//브라우저가 종료되어도 남아있다.

//세션: 브라우저가 동작되는 동안에 남아있는 데이터
//상태같은 내용을 다룰 때 사용한 예) 로그인 되어있는 상태
//브라우저의 종료시점까지 유지된다.

//document객체 안에 있다.
console.log(document.cookie);

//쿠키 구조
//쿠키에도 키와 값이 있다.
//문자열로 저장하면 된다.

/*

name: 쿠키의 이름(키)
value: 쿠키 안의 내용 (값)
time: 유효시간
*매개변수의 이름은 스스로정하는것!
*/
function createCookie(name, value, time){
    //처음 필요한 것 쿠키의 지속시간
    //쿠키 유효기간
    //시간과 날짜 연도 정보를 제공해주는 객체를 만들수가 있다.
    //객체는 생성자로 구현이 가능하다. new 무엇을 생성해줘야 하지?
    //Date

    //현재 시간에 정보를 가지고 있는 객체를 만들어준다.
    let date = new Date();
    console.log(date);

    //1시간 이후에 제거하고 싶어
    let day = 1;
    //getTime: 현재 시간
    console.log(date.getTime() + time * 24 * 60 * 60 * 1000);
    //지금 시간에서 + 얼마나 쿠키를 유지할지 시간을 구해서 추가해줄 것
    //쿠키가 제거될 시간을 구해서 값을 만들어 놓고
    //만료시간

    //set get
    //set: 변경할 때 네이밍으로 많이 사용한다.
    //get: 정보를 호출할 때
    //객체로 만들어서 정보를 가져오는 경우. 메소드는 get을 쓰고
    //set

    //setTime메소드
    //하루 이후 시간
    date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);     //만료시간을 가지고 있는 객체


    //쿠키를 추가하는 방법
    //기본규격
    //쿠키의 명 = 값;expires+만료일+";path=/"
    //path=/ 페이지의 경로에 대한 설정 쿠키를 다루는 경로
    //toUTCString메소드: 날짜 시간 표시 방법을 변경해준다. 
    console.log(date.toUTCString());
    //날짜 형태를 변경해서 "Wed, 22 Mar 2023 04:47:13 GMT"이런식으로
    document.cookie = name+"="+value+";expires"+date.toUTCString()+";path=/";
}

//createCookie("이벤트 팝업","true","1");
console.log(document.cookie);

/* 69 ~ 77 행은 야매로 작성한 것.
function getCookie(){
    let value = document.cookie.split("=");
    // = 제거하고 배열로 변경
    console.log(value);
    
    return value[1];
}
*/

//쿠키함수를 작성해보자.
//정규식이 포함되기는 하는데 지금은 무시해도 된다.
//다들 정규식은 간단한것만 사용하고 핗요한 내용이 생가면 찾고 하면 편해서 팢아서 작성하는 경우가 많다.
function getCookie2(name){
    //match 메소드
    //매개변수로 정규식 전달
    let value = document.cookie.match("(^|;) ?" + name + "+([^;]*)(;|$)");
    console.log(value);
    return value ? value[2] : null;
}



//쿠키를 제거하는 함수. 이 함수가 제일 쉽다.
//쿠키를 상하게만 하면 된다. 날짜를 강제로 지나게 하는 것.

function deleteCookie(name){
    document.cookie = name + "=; expries=Thu, 01 jan 1999 00:00:10 GMT;";
}
deleteCookie("이벤트 팝업");
deleteCookie("이벤트 팝업2");
console.log(getCookie2("이벤트 팝업"));
console.log(getCookie2("이벤트 팝업2"));


//로컬 스토리지
//로컬 스토리지: 브라우저에 데이터를 저장하는 방법들 중 하나고
//PC에 데이터가 저장되고
//쿠키, 세션과 다른점: 만료일이 없다. 만료 기간 또한 없다.

//로컬 스토리지 쉽다.(쿠키보다)
//브라우저 기능을 사용해야 하니까 window 객체 안에 있는 메소드를 사용
//getItem메소드: 값을 호출할 때 사용한다.
//get이 붙었네?
//getItem()메소드는 매개변수로매개변수로 "키값"
//window.localStorage.getItem()

//setItem 메소드는 값을 키와 함께 저장시켜준다.
//window.localStorage.setItem("userID","soo");
let a = window.localStorage.getItem("userID");
console.log(a);

//쿠키, 로컬스토리지 이런 저장소에는 민감한 값을 저장하면 안된다.
//보안이슈 

//오늘 내용 어려운것이 정상
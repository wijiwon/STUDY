//HTML의 span태그의 클래스인 popup-btn을 가리킴 (팝업창 내 우측상단 X)
let popupBtn = document.querySelector(".popup-btn");
//HTML의 button태그의 클래스인 event-btn을 가리킴 (팝업창 내 좌측 상단 '클릭'버튼)
let popupEvent = document.querySelector('.event-btn'); 
//setCookie로 생성된 쿠키 event-popup을 가리킨다.(쿠키의 유지시간을 지정하는 쿠키)
let popupCookie = getCookie("event-popup");

function popupOpen(){       // 함수 popupOpen 선언. 팝업창의 노출여부를 결정하는 함수
    //팝업창을 감싸는 div영역인 popup-wrap을 가리킴
    let popup = document.querySelector('.popup-wrap');
    //'is-on'클래스를 생성하여 is-on의 유무에 따라 팝업창 노출, 비노출 실행진행

    //변수popup이 가리키는 태그의 클래스에 'is-on'이 있으면 참, 없으면 거짓
    if(popup.classList.contains("is-on")){
        //변수 popup에 클래스'is-on'이 있으면 클래스를 지워 비노출로 변경한다.
        popup.classList.remove('is-on');
    }else{
        //변수 popup에 클래스'is-on'이 없으면 클래스를 추가해 노출로 변경한다.
        popup.classList.add('is-on');
    }
}
//태그 popupBtn의 이벤트 구독. popupBtn를 click하면 함수 popupOpen 실행
//팝업창 내 X 버튼을 클릭하면 is-on class가 지워지며 팝업창이 사라진다.
popupBtn.addEventListener("click",popupOpen);


//태그 popupEvent의 이벤트 구독. popupEvent를 click하면 익명함수 실행
popupEvent.addEventListener("click",function(){
    console.log('이벤트');
    // setCookie('설정할 이름',설정할 값, 설정할 기간)
    // setCookie를 이용하여 쿠키 추가
    // event-popup이라는 이름의 쿠기 생성. 이 쿠키는 true 값을 가지고 10초의 시간을 갖는다.
    setCookie("event-popup",true,10);
})

/* popupEvent태그를 눌러서 popupEvent의 익명함수가 실행되면 실행되기 전에는
    undefined 타입이었지만, 실행 후에는 string으로 변경되어 표시된다.
    따라서, event-popup의 타입은 string이다.*/
// 쿠키, 로컬스토리지 둘 다 문자로 저장된다.
// 코딩을하면서 데이터를 저장할때 문자열로 저장한다.
console.log(typeof getCookie("event-popup"))
// 하루동안 팝업 안보이기

/* 쿠키값이 없다 == undefined. 사용자가 일부러 쿠키값을 없애거나,
    event-popup에서 지정된 쿠키시간이 종료되면 쿠키값이 사라진다. */
// 쿠키값이 없으면 popupOpen함수가 작동하여 팝업이 뜨도록 한다.
if(popupCookie == undefined)
{
    popupOpen();
}

// 함수 getCookie 선언. (인터넷에서 불러옴)
function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
     x=x.replace(/^\s+|\s+$/g,"");
     if (x==c_name)
     {
       return unescape(y);
     }
   }
}
// 함수 setCookie 선언.
function setCookie(c_name,value,time){
    /*변수 date선언. 
        new Date에 매개변수를 제공하지 않으면 생성한 순간의 날짜와 시간을 나타내는
        Date 객체를 생성한다. */
    let date = new Date();
    
    /* popupEvent 클릭 시 동작하는 익명함수에서의 선언문 setCookie("event-popup",true,10);
        'date.setTime'에 'date.getTime()'으로 'event-popup'을 받고,
        'value'값을 'true'로 받고 'time'값을 '10'으로 받는다. */
        
    /* 따라서, 'date.setTime'은 'event-popup'으로 값을 받고, 지속시간(1000 == 1초)은
        '10 * 1000'이므로 10초 동안의 지속시간이 주어진다. */
    date.setTime(date.getTime() + time * 1000);

    let str = c_name+"="+value+";expires="+date.toUTCString()+";path=/";
    let str2 = getCookieTime(str);
    // 문자열로 데이터를 저장하는데
    // 값이 여러개일경우
    // 배열이라던지 객체를 사용
    // 여러가지의 값을 사용해야하기때문에 객체의 모양으로 문자열을 전달하고
    // 문자열을 받아서 객체로 변환하여 사용하자.
    console.log(getCookieTime(c_name+"="+value+";expires="+date.toUTCString()+";path=/"));
    document.cookie = c_name+"="+`{"value" : "${value}", "time" : "${str2}"}`+";expires="+date.toUTCString()+";path=/"
    let value2 = getCookie("event-popup");
    console.log(JSON.parse(value2));
}
//함수 getCookieTime 선언. 'setCookie'쿠키 내에서 매개변수를 받아 실행된다.
function getCookieTime(cookie){
    // 지역변수 str선언. 쿠키 문자열을 받아서 ';'부분마다 잘라 배열로 변환
    let str = cookie.split(';');
    let str2 = str.find(function(i){
        let temp = i.trim();
        return temp.startsWith('expires=');
    })
    if(str2){
        let str3 = str2.trim();
        console.log(str3);
        // 쿠키의 시간을 받아서 시간의 정보들을 다루는 
        // Date객체를 만들어줬다.
        return new Date(str3);
    }else{
        return null;
    }
}

// trim 메소드 : 문자열 양끝의 공백을 제거
let a = "    a b     ";
console.log(a);
console.log(a.trim());

// startsWith 메소드 : 해당 문자로 시작하는지 여부
// 매개변수로 시작하는 문자열 전달해주면 된다.

let b = "abcd";
console.log(b.startsWith("abc"))


// 시간의 차이를 구해서 값을 받아보자
// 밀리초를 받아서 시간이 얼마나 남은건지 확인하는 함수
// 시간계산을 할때 언제 시간이 만료되는지 알고있으면 되는거죠?
// 지금 시간의 정보를 가지고있는 Date객체를 만들어서
// 미래 시간의 밀리초와 지금 만든 Date객체의 밀리초를 빼면
// 차이값이 나오는데 그 차이값(밀리초)를 가지고 날짜와 시간과 분,초 이렇게 나타내주기만 하면 된다.
// times함수로 밀리초를 가지고 날짜 시간 분 초가 얼마나 남은건지.
let dateTemp = 1000;


// 비동기 함수 setTimeout이 함수는 매개변수로 전달한 시간이후에 실행되는 함수.
// setTimeout(() => {
//     // 1초뒤에 실행
// }, 1000);

// 비동기 함수
// 매초마다 동작하는 함수를 만들어보자
// 정한 시간마다 동작하는 함수
// 매개변수로 전달한 시간마다 동작한다.
// let date1 = new Date();
// date1.setTime(date1.getTime() + 100000);
// let time = JSON.parse(popupCookie).time;
// let date = new Date(time);
//console.log(date);
// setInterval 제거 방법
let setTime = setInterval(() => {
    let date2 = new Date();
    // // 값이 들어온것 객체가 아니고
    // let time = date1.getTime() - date2.getTime();
    // // 1초마다 실행
    // times(time);
    let timeTag = document.querySelector('.popup-time');
    if(popupCookie != undefined)
    {
        let time = JSON.parse(popupCookie).time;
        let date = new Date(time);
        console.log(date);
        console.log(date2);
        console.log(popupTime(date,date2));
        timeTag.innerHTML = times(popupTime(date, date2));
    }else{
        timeTag.innerHTML = "시간끝";
    }
}, 1000);

function popupTime(date1,date2) {
    return date1.getTime() - date2.getTime();
}

function times(time){
    // let sec = Math.floor(time / (24*60*60*1000));
    // let min = Math.floor(time / (60*60*1000));
    // console.log(min);
    let day = Math.floor(time / (24 * 60 * 60 * 1000));
    // 받아온 시간에서 날짜가 하루 단위가 있으면 나눠서 값을 넣어주고
    // 일단위를 빼고
    time %= (24 * 60 * 60 *1000);
    let hour = Math.floor(time / (60 * 60 * 1000));
    // 시간단위를 빼고
    time %= (60 * 60 * 1000);
    let min = Math.floor(time /(60 * 1000));
    // 분단위를 다빼고
    time %= (60 * 1000)
    // 남은 초
    let sec = Math.floor(time / 1000);
    console.log(day);
    console.log(hour);
    console.log(min);
    console.log(sec);
    if(time < 0)
    {
        // 지울 Interval 함수 매개변수로 전달하면된다.
        clearInterval(setTime);
        let timeTag = document.querySelector('.popup-time');
        timeTag.innerHTML = "";
    }
    return `${day}일 ${hour}시 ${min}분 ${sec}초`;
}

// 
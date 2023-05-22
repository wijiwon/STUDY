
let popupBtn = document.querySelector(".popup-btn");
let popupEvent = document.querySelector('.event-btn');
let popupCookie = getCookie("event-popup");
console.log()
function popupOpen(){
    let popup = document.querySelector(".popup-wrap");
    if(popup.classList.contains("is-on")){
        popup.classList.remove('is-on');
    }
    else{
        popup.classList.add('is-on');
    }
}


popupBtn.addEventListener("click",popupOpen);


popupEvent.addEventListener("click",function(){
    console.log('이벤트');
    //쿠키추가
    //하루동안 유지되는 쿠키생성
    setCookie("event-popup",true,100);
})
//문자로 저장되는 구나. 쿠키, 로컬스토리지 둥 자
//코딩을 하면서 데이터를 저장할 때 문자열로 저장한다.
console.log(typeof getCookie("event-popup"))
//하루동안 팝업 안보이기

console.log(typeof popupCookie);
if(popupCookie == undefined){       //쿠키값이 없으면 undefined
    popupOpen();
}



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

function setCookie(c_name,value,time){
   let date = new Date();
   let str =  c_name+"="+value+";expires="+date.toUTCString()+";path=/";
   let str2 = getCookieTime(str);
   //문자열로 데이터를 저장하는데
    //값이 여러개일 경우
    //배열이라던지 객체를 사용
    //여러가지의 값을 사용해야 하기 때문에 객체의 모양으로 문자열을 전달하고
    //문자열을 받아서 객체로 변환하여 사용하자
   date.setTime(date.getTime() + time * 1000);
   console.log(getCookieTime(c_name+"="+`{"value" : "${value}", "time" : "${str2}"}`+";expires="+date.toUTCString()+";path=/"));
   document.cookie = c_name+"="+value+";expires="+date.toUTCString()+";path=/"
   let value2 = getCookie("event-popup");
   console.log(JSON.parse(value2));
}

function getCookieTime(cookie){
    //쿠키 문자열을 받아서 배열로 변환
    let str = cookie.split(';');
    let str2 = str.find(function(i){
        let temp = i.trim();
        return temp.startsWith('expires=');
    })
    if(str2){
        let str3 = str2.trim();
        console.log(str3);
        console.log(str3);
        //쿠키의 시간을 받아서 시간의 정보들을 다루는 Date객체를 만들어줬다.
        return new Date(str3);
    }
    else{
        return null;
    }
}

//trim 메소드: 문자열의 양 끝의 공백을 제거한다.
let a = "        a  b      "
console.log(a);

console.log(a.trim());

//startsWith 메소드: 해당 문자로 시작하는지 여부
//매개변수로 시작하는 문자열을 전달해주면 된다.

let b = "abcd";
console.log(b.startsWith("a"));
console.log(b.startsWith("abc"));
console.log(b.startsWith("d"));
//문자가 매개변수로 시작되는 지 true, false로 알려준다.


//시간의 차이를 구해서 값으 받아보자
//밀리초를 받아서 시간이 얼마나 남은건지 확인하는 함수
//시간계산을 할 때 언제 시간이 만료되는지 알고있으면 되는거죠?
//지금 시간의 정보를 가지고있는 Date객체를 만들어서
//미래 시간의 밀리초와 지금 만든 Date객체의 밀리초를 빼면
//차이값이 나오는데 그 차이값은 (밀리초)를 가지고 날짜와 시간과 분, 초 이렇게 나타내주기만 하면 된다.
//times 함수로 밀리초를 가지고 날짜 시간 분 초가 얼마나 남은건지
function times(time){
    //time은 밀리초
    //일수로 따지면
    let day = Math.floor(time / (24 * 60 * 60 * 1000));
    time %= (24 * 60 * 60 * 1000);      //%= 나머지 연산자의 결과를 대입시켜 바로 사용이 가능하다.
    //시간으로 따지면
    let hour = Math.floor(time / (60 * 60 * 1000));
    time %= (60 * 60 * 1000);
    //분으로 따지면
    let min = Math.floor(time / (60 * 1000));
    time %= (60 * 1000);
    //초로 따지면
    let sec = Math.floor(time / (1000));
    time %= (1000);


    console.log("날짜 : " + day);
    console.log("시간 : " + hour);
    console.log("분 : " + min);
    console.log("초 : " + sec);
    return day + "일" + hour + "시간" + min + "분" + sec + "초";
}

let dateTemp = 10000;
times(dateTemp);

//비동기 함수. setTimeout이 함수는 매개변수로 전다한 시간 이후에 실행되는 함수.
setTimeout(() => {
    //1초 뒤에 실행
}, 1000);


//비동기 함수
//매 초마다 동작하는 함수를 만들어보자
//정한 시간마다 동작하는 함수
//매개변수로 전달한 시간마다 동작한다.

// let date1 = new Date();
// date1.setTime(date1.getTime() + 100000);

setInterval(() => {
    let date2 = new Date();
    //객제가 아닌 값이 들어온 것
    // let date3 = new Date();

    // let time = date1.getTime() - date2.getTime();
    // //1초마다 실행
    let time = document.querySelector('.popup-time');
    if(popupCookie != undefined){
        let time = JSON.parse(popupCookie).time;
        let date = new Date(time);
        time.innerHTML = popupTime(date,date2);
    }
    else{
        time.innerHTML = "시간 끝";
    }
    
}, 1000);


function popupTime(date1,date2){
    return date1.getTime() - date2.getTime();
}
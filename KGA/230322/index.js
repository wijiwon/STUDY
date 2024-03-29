//DOM 내용 추가


//우리가 사용하는 div d h1 태그들

//DOM 트리
//DOM트리 구조 한번 보자


//DOM 트리의 기본 단위는 노드라고 한다.

// 문자열로 태그 사이에 넣어서 태그를 추가하는 방법
// document.querySelector('.add_class').innerHTML = "<div>ddd</div>";

//트리구조의 노드를 만들어 추가하는 방법
// div 태그를 생성하는 방법

//createElement: 태그 생성해주는 메소드
//createElement(태그명)
let _div = document.createElement('div');
//d여기까지는 생성해서 _div변수에 담았고
//생성된 태그는 메모리공간에 있는것
console.log(_div);


//생성한 태그에 내용을 넣고
_div.innerHTML = "<p>내용이 </p><div>없냐?</div>";

//생성한 태그에 클래스도 추가
_div.classList.add("new_tag");

//태그의 위치를 추가하지 않으면 보이지 않는다.
//태그를 추가하고 싶은 위치에 추가를 해줘야 트리에 추가되어 보인다.
//원하는 위치에 추가해주자
//사용해야 할 메소드

//append() 메소드
//태그추가
document.body.append(_div);

setTimeout(() => {
    document.querySelector('.add_class').append(_div);
}, 2000);

//append 메소드는 원하는 위치에 태그를 추가할 수 있다.
//태그참조.append(생성한 태그) = 태그참조하고 태그의 내용으로 생성한 태그가 추가된다.

//innerHTML : 문자로 내용이 들어가서 보안이 취약하다.
//append: DOM 트리의 노드이기 때문에 보안에 문제가 없다. 태그 작업을 세분화할 수 있다.


//태그의 내용 전부 확인
console.log(_div.innerHTML);        //문자열로 쓴 태그의 텍스트내용까지 전부 읽어준다.
//결과: <p>내용이 </p><div>없냐?</div>


//태그의 내용에서 문자만 가져오고 싶어.
//innerText : 태그 사이의 문자만 가져온다.

console.log(_div.innerText);
/*결과: 
내용이

없냐?
*/

//button태그 생성
let _button = document.createElement('button');
_button.innerHTML = "눌러봐";

//태그를 만들고 우리가 사용한 것처럼 그대로 사용하면 되고 
//내용을 추가해준 다음 원하는 위치에 태그를 넣어주면 된다.

_button.onclick = function(){
    //클릭했을 때 _div 태그를 제거해보자
    //_div.remove();
    //remove()메소드가 _div 태그를 제거해준다.
    //원하는 태그를 제거할 수 있다.
    //태그의 자식 태그도 제거할 수 있다.
    //태그의 자식태그는 removeChild(); 메소드를 사용한다.
    
    //let _div2 = document.querySelector('');
    console.log(_div);
    //document.body.removeChild(_div);
    //_div태그를 body태그의 내용에서 찾아서 제거해준다.
}

document.body.append(_button);      //_button태그를 html 바디태그에 추가해서 노출

// onclick 이렇게 이벤트 명으로 직접 함수를 대입해서 추가하는 방법
// 함수를 덮어씌운다.
// 또 다른 방법이 하나 더 있다.

//addEventListener : 이벤트를 구독 시킨다.
// onclick => on만 빼면 된다.
//ex. onscroll => on만 빼고 scroll
//addEventListener 메소드의 매개변수로 "구독할 이벤트 이름"
// 두번째 매개변수로 실행시킬 함수
_button.addEventListener("click", function(){
    console.log("나 클릭 구독중");
})

_button.addEventListener("click", function(){
    console.log("나도 구독중");
})

//addEventListener 메소드는 이벤트를 누적시킬 수 있다. 여러개 추가가 가능하다.
//onclick은 이벤트를 덮어쓴다.

_button.onclick = function(){
    console.log("나 onclick 이벤트");
}
console.log(_button.onclick);

_button.onclick = function(){
    console.log("나 onclick 이벤트2");
}
console.log(_button.onclick);
//onclick 메소드는 이벤트를 덮어쓰기 때문에 가장 마지막에 작성된 이벤트 단 한개만 노출된다.


//이벤트들 뭐 있을까

//load - 페이지와 기타 요소들의 그릴 준비 로딩이 끝났을 때
//on이 붙으면 어트리뷰트 방식
window.onload = function () {
    
}

// load 이벤트 구독
// addEventListener("이벤트의 타입", 함수의 내용)을 사용해서 
//이벤트를 구독해놓는다.
window.addEventListener('load',function(){
    //load이벤트가 실행되면 내용 실행
});

// onresize: 브라우저의 창 크기가 바뀌면 실행되는 이벤트
window.onresize = function(){       //어트리뷰트 방식
    console.log("창 사이즈 변환");
}

window.addEventListener("resize",function(){

})

//scroll: 사용자가 태그나 페이지에서 스크롤 했을 때.
//scroll 값이 없으면 동작하지 않는다.

//태그의 이벤트로 원하는 이벤트를 구독하면 태그에서 그 이벤트가 발생할 때
//실행된다.

// 여기는 우리가 생성한 태그에서 scroll 이벤트에 구독
_div.onscroll = function(){
    //스크롤 이벤트가 실행되면 우리가 추가할 기능
    console.log('나 스크롤 되고 있니?');
}

//여기는 body 태그에서 scroll 이벤트에 구독
document.body.onscroll = function(){
    
}


//키보드 이벤트들

//onkeydown: 사용자가 키보드를 누르자마자(누르고 뗀 것이 아닌 눌렀을 그 당시에 바로)
window.onkeydown = function(){
    console.log("나 키 누르자마자");
}

//onkeyup: 사용자가 키보드를 누르고 뗐을 때 (누르고 있다가 키를 떼는 순간 )
window.onkeyup = function(){
    console.log("키보드를 누르다가 뗐어");
}

//onkeypress: 키보드를 누르고 있을 때 (키를 누르고 있으면 계속 실행)
//omkeydown을 누르고 있어도 계속 실행되기 때문에 사용할 경우가 많지 않을 수 있다.
//omkeydown하는 순간 동작할 기능 1 / onkeypress 누르고 있는 동안 발생시킬 기능2 
//이런식으로 진행하는 떄 등으로 사용할 수 있다.
window.onkeypress = function(){
    console.log("키보드를 누르고 있는 동안");
}




//마우스 이벤트
//click: 사용자가 해당 캐그를 클릭했을 때 발생하는 이벤트
window.onclick = function(){
    console.log("나 클릭");
}

//dbclick: 더블 클릭했을 때 실행되는 함수
window.ondblclick = function(){
    console.log("더블클릭");
}

//mousedown: 마우스를 누르자마자 실행되는 이벤트
window.onmousedown = function(){
    console.log("마우스 키 다운");
}

//mouseup: 마우스를 누르다가 뗐을 때 실행되는 이벤트
window.onmouseup = function(){
    console.log("마우스 키 업");
}

//onmousedown과 mouseup
//마우스 키를 누르고 이동한 뒤 키를 뗐을 때 좌표로 계산해서 동작해야하는 기능을 만들 때 사용합니다.
//페이지 내의 슬라이드 구현가능

//mousemove: 마우스가 태그 위에서 이동되는 동안
_div.onmousemove = function(){                  //명시된 태그 안에서 이벤트가 일어났을 때 실행된다. 따라서 _div 태그안에서 이벤트 발생 시 실행
    console.log("마우스 이동 중 입니다.");
}

let _box = document.querySelector(".box")

//mouseenter: 마우스를 태그에 올려졌을 때 실행되는 이벤트
//hover와 유사
_box.onmouseenter = function(){
    console.log("마우스가 올려짐");
}

//mouseleave: 마우스가 태그 위에서 나갔을 때 실행되는 이벤트
_box.onmouseleave = function(){
    console.log("마우스 나갔어");
}
//기능을 hover처럼 추가할 수 있겠구나

//개발할때 pc, 모바일 이렇게 웹을 만들게 될 텐데
//모바일 환경에서 실행되는 이벤트


//모바일 터치
//touchstart: 화면을 터치한 순간

 window.ontouchstart = function(){
    console.log("모바일 터치됐어");
 }

 //touchend: 화면을 터치하다가 떼면
 window.ontouchend = function(){
    console.log("모바일 터치하다가 뗐어");
 }

 //touchmove: 화면을 터치하고 이동할 때 (클릭무브와 달리 누른상태로 이동해야한다.)
 window.ontouchmove = function(){
    console.log("터치하고 이동 중");
 }

 

// 이벤트를 좀 알아봤는데
//이벤트 실행될 때 매개변수로 해당 이벤트의 내용이 전달 됩니다.
// click의 이벤트를 보자
_box.onclick = function(r){
    //이벤트의 내용들 이벤트가 실행되면 이벤트의 내용이 값으로 넘어온다.
    console.log(r);
    
    //해당 이벤트가 일어난 타겟
    //지금은 window에 click이벤트가 일어나면 실행되는 기능을 실행시켰고
    //click된 태그를 target이 클릭된 태그를 가져온다.
    console.log(r.target);
    //div박스 영역 클릭 : div 박스영역을 노출
    //div 박스 안에 p태그 클릭: p태그 노출

}


//마우스의 위치를 가져와봐야겠다.
window.onmousemove = function(m){
    //타입이 뭐지?
    //이벤트 타입을 확인해보자
    console.log(m.type);        //결과: mousemove

    //해당 이벤트 일어나면 마우스의 좌표 x값
    //좌표 값은 픽셀단위로 노출된다.
    // 0 ~ 브라우저의 너비크기
    console.log(m.pageX);

    //이벤트 발생 시 마우스 좌표 Y값
    // 0 ~ 브라우저의 높이
    console.log(m.pageY);
}



//키보드 입력
window.onkeydown = function(e){
    //e.keyCode
    console.log(e.keyCode);
    //ascii코드: 숫자로 표현된다.
    //A를 입력하면
    if(e.keyCode == 65){
        console.log("A키를 입력 받았다.");
    }
}


//기본 동작을 취소하는 방법
let _button2 = document.querySelector(".btn_class");

_button2.onclick = function(e){
    //기본동작이 제거된다.
    //브라우저 상에서 기본 동작되는 기능을 제거해줄 수 있다.
    e.preventDefault();
}







 //드래그 이벤트

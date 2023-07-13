
// 클릭의 시작 위치를 가지고 있고
// 끝나면 끝난 좌표와 비교를해서 
// 오른쪽으로 스와이프 된건지
// 왼쪽으로 스와이프 된건지 부터 확인을하고
// 인덱스를 기준으로 움직임을 제어해보자.

// 마우스 시작 클릭 지점 X좌표
let _start;
// 진행중인 인덱스
let _index = 0;

let _swiper = document.querySelector('.swiper');
let _swiperContent = document.querySelector('.swiper-content');
let {length} = document.querySelectorAll('.swiper-item');
let _prev = document.querySelector('.prev');
let _next = document.querySelector('.next');

console.log(length);
// getComputedStyle 적용된 스타일의 값을 가져올수있다.
// 적용된 스타일을 가져올 태그를 매개변수로 전달
let _swiperWidth = parseInt(getComputedStyle(_swiper).width);
console.log(_swiperWidth);


_swiper.addEventListener("mousedown",function(e){
    console.log("클릭 시작");
    // 클릭했을때 X 좌표
    console.log(e);
    // 클릭한 X의 좌표
    // e.clientsX;
    _start = e.clientX;
    console.log(_start);
});

_swiper.addEventListener('mouseup',function(e){
    if(e.clientX < _start)
    {
        console.log("끝 좌표가 더 작아");
        if(_index < (length - 1))
        _index++;
        swiperMove();
    }else{
        console.log("끝 좌표가 더 커");
        if(_index > 0)
        _index--;
        swiperMove();
    }
})

// 인덱스를 기준으로 움직임
function swiperMove(){
    _swiperContent.style.left = -(_index * _swiperWidth) + "px";
}
swiperMove();

_prev.addEventListener('click',function(){
    if(_index > 0)
    _index--;
    swiperMove();
})

_next.addEventListener('click',function(){
    if(_index < (length - 1))
    _index++;
    swiperMove();
})
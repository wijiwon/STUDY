//클릭의 시작 위치를 가지고 있고
//끝나면 끝난 좌표와 비교해서
//오른쪽으로 스와이프 된 건지 왼쪽으로 스와이프 된 건지부터
//확인을 하고 인덱스를 기준으로 움직임을 제어해보자

//마우스 클릭의 시작지점 X좌표
let _start;
//진행중인 인덱스
let _index = 1;

let _swiper = document.querySelector('.swiper');        //스와이퍼의 전체영역
let _swiperContent = document.querySelector('.swiper-content')      //스와이퍼 이미지 영역
let {length} = document.querySelectorAll('.swiper-item');       //각 스와이퍼
let _prev = document.querySelector('.prev');        //이전 버튼
let _next = document.querySelector('.next');        //다음 버튼

console.log(length);
//getComputedStyle 적용된 스타일의 값을 가져올 수 있다.
//적용된 스카일을 가져올 태그를 매개변수로 전달
let _swiperWidth = parseInt(getComputedStyle(_swiper).width);   //스와이퍼의 가로사이즈. parseInt로 500px -> 500으로 변경
console.log(_swiperWidth)

_swiper.addEventListener("mousedown", function(e){      //스와이퍼 영역에서 드래그로 스와이퍼 이동하기 위한 이벤트 함수
    console.log("클릭시작");        //스와이퍼 영역에서 클릭 시작 시 동작
    //클릭했을 때 X좌표가 필요
    console.log(e);         //클릭 시, 클릭한 곳의 좌표에 대한 정보를 알려준다.
    //클릭한 x의 좌표
    //e.clientX;
    _start = e.clientX;     //_start는 클릭 시 x좌표 값이다.
    console.log(_start);
})

_swiper.addEventListener('mouseup',function(e){     //스와이퍼 영역에서 드래그로 스와이퍼 이동하기 위한 이벤트 함수. 클릭후 마우스를 뗐을 경우 발생
    if(_start - e.clientX > 50){        //클릭 시 x좌표가 뗐을 때의 좌표보다 값이 50이상 컸을 경우
        console.log("끝 좌표가 더 작아");
        if(_index < (length - 1) ){     //인덱스가 배열의 길이 -1보다 작을 경우
            _index++;       //인덱스의 값은 1씩 증가한다. 따라서 오른쪽으로 넘어가는 슬라이드가 진행된다.
            swiperMove();   //스와이퍼 영역에서 노출될 스와이퍼를 결정하기 위해서 실행되는 함수.
            _swiperContent.style.transition = '1s';     //setTimeout 동작에서 transition 의 값을 안주면 다른 모션까지 안들어가서 다시 1s 부여
            if(_index == 5){        //스와이프가 노출하고자하는 영역(_index1,2,3,4)을 지나가게 되면
                setTimeout(() => {                 //시간차로 동작을 하게된다.
                    _swiperContent.style.transition = '0s';     //슬라이드 시 무빙을 없애고
                    _index = 1;     //인덱스 값을 가장 처음으로 노출하고자 하는 값인 1로 이동
                    _swiperContent.style.left = -500 + "px";    //슬라이드 노출영역을 인덱스 1의 위치인 x좌표 값으로 지정
                }, 1000);       //1초 안에 setTimeout이 동작한다.
            }
        }
        console.log(_start - e.clientX);
    }
    else if(_start - e.clientX < -50){      //클릭 시 x좌표가 뗐을 때의 좌표보다 값이 -50이상 작았을 경우
        console.log("끝 좌표가 더 커");
        if(_index > 0){     //인덱스가 0보다 클 경우
            _index--;       //인덱스의 값은 1씩 감소한다. 따라서 왼쪽으로 넘어가는 슬라이드가 진행된다.
            swiperMove();   //스와이퍼 영역에서 노출될 스와이퍼를 결정하기 위해서 실행되는 함수.
            _swiperContent.style.transition = '1s';     //setTimeout 동작에서 transition 의 값을 안주면 다른 모션까지 안들어가서 다시 1s 부여
            if(_index == 0){    //인덱스의 값이 0일 경우
                setTimeout(() => {                //시간 차로 동작을 진행하게 된다.
                    _swiperContent.style.transition = '0s';     //슬라이드 시 무빙을 없애고
                    _index = length-2;       //인덱스 값을 가장 마지막으로 노출하고자 하는 값인 (length-2 -> length -1은 노출을 희망하지 않으므로)로 이동
                    _swiperContent.style.left = -2000 + "px";   //슬라이드 노출영역을 인덱스 4의 위치인 x좌표 값으로 지정
                }, 1000);       //1초 안에 setTimeout이 동작한다.
    
            }
        }
        console.log(_start - e.clientX);
    }
})

//인덱스를 기준으로 움직임

function swiperMove(){      //노출될 영역에 어떤 스와이프 값을 넣을 지 결정하는 함수
    _swiperContent.style.left = -(_index * _swiperWidth) + "px";    //인덱스번호 * 스와이프 가로영역
}
swiperMove();

_prev.addEventListener('click',function(){      //'이전'버튼 클릭시 이전 인덱스를 보여줄 것을 동작할 이벤트 함수
    
    if(_index > 0){     //인덱스 값이 0보다 크다면
        _index--;       //인덱스가 1씩 감소한다.
        swiperMove();       // 감소한 인덱스 값으로 스와이프 영역에 노출될 스와이프를 결정한다.
        _swiperContent.style.transition = '1s';     //setTimeout 동작에서 transition 의 값을 안주면 다른 모션까지 안들어가서 다시 1s 부여
        if(_index == 0){        //인덱스 값이 0이라면
            setTimeout(() => {                
                _swiperContent.style.transition = '0s';
                _index = length-2;
                _swiperContent.style.left = -2000 + "px";
            }, 1000);

        }
    }
    // setTimeout(() => {
    //     if(_index == 1){
    //         _index = length - 1;
    //         swiperMove();
    //         setTimeout(() => {
    //         }, function(){
    //             _swiperContent.style.transition = '0ms';
    //             _swiperContent.style.left = -2000 + "px";
    //         }, 550);
    //     }
    // }, 1000);
})
// _prev.addEventListener('click',function(){
//     if(_index == 0){
//         _index = length - 2;
//         swiperMove();
//     }
// })
_next.addEventListener('click',function(){      //'다음'버튼 클릭스 다음 인덱스를 보여줄 것을 실행할 함수
    if(_index < (length - 1)){      //인덱스가 인덱스길이-1보다 작다면
        _swiperContent.style.transition = '1s';     //setTimeout 동작에서 transition 의 값을 안주면 다른 모션까지 안들어가서 다시 1s 부여
        _index++;       //인덱스가 1씩 증가한다.
        swiperMove();       //증가된 인덱스 값으로 노출영역에 노출될 스와이프의 값을 정한다.
        if(_index == 5){        //인덱스 값이 5라면
            setTimeout(() => {                
                _swiperContent.style.transition = '0s';
                _index = 1;
                _swiperContent.style.left = -500 + "px";
            }, 1000);
        }
    }
    // else if(_index == (length - 2)){
    //     _index = 1;
    //     swiperMove();
    // }
})
// _next.addEventListener('click',function(){
//     if(_index == (length - 1)){
//         _index = 1;
//         swiperMove();
//     }
// })



//추가 기능 적용
/*
1만 차이가나도 넘어가버리니까
수치 조절가능하게 조절
민감도 수치 넣어보고 50정도 (x좌표의 차이 값이 50이상일 경우 -50이하일 경우 동작)

루프속성
아이템을 끝에 하나씩 더 배치를 하고 ( 5 1 2 3 4 5 1 )
애니메이션 끄고 5번이나 1번에 이동했을 때
left값을 끝 값으로 이동시키게 무한 스크롤처럼 눈속임이 보이도록한다.
*/
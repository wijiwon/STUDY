// 예외 처리문

//try-catch문: 코드 실행 중 예외 상황이 발생해도 프로그램이 종료가 되지 않고
//프로그램을 유지할 수 있다.

//try-catch
//프로그램의 안전성을 높힐 수 있다.
/*
try {
    //오휴가 발생할 것 같은 코드
} catch (error) {
    //오류가 발생했을 때 이 자리로 들어온다.
    //오류의 메세지 erroe 매개변수 처럼 이름을 바꿔도 된다.
}
*/
try {
    //throw: 에러 메시지를 던질 수 있다.
    if(5 == 5)throw"Err발생"
} catch (error) {
    console.log(error);
}
//결과: Err발생

function myStr(){
    let devValue = document.querySelector('.dev').value;
    try {
        if(devValue =="")throw "비었음"     //devValue가 비어있으면 오류메세지를 던져라
        devValue = Number(devValue);
        //number숫자로 타입을 변경해주는 생성자 함수
        if(isNaN(devValue)) throw "number가 아님"   //숫자가 아닌 값이 주어지면 오류메세지가 나옴
        //문자열이 들어가면 숫자로 변환될 수 없어서 number가 아니다.

        //오류가 발생을 해도 프로그램이 종료가 안된다.
    } catch (error) {
        //코드를 실행하다가 err가 발생하면
        //catch문을 실행하고 오류의 내용은
        //error매개변수에 들어온다.
        console.log(typeof devValue)    //결과: devValue 값이 공백- string  / devValue 값이 숫자X- number
        console.log(devValue)   //결과: devValue 값이 공백-     / devValue 값이 숫자X- NaN
        document.querySelector(".message").innerHTML = error;   //html의 message 클래스에 error의 내용을 던진다.
    }
}
//팝업여는 함수

function openPopup(){
    let popup = document.querySelector(".popup-wrap");

    //디버깅하는 습관
    console.log(popup);

    console.log(popup.className);
    console.log(popup.classList);

    /*  popup.className     을 사용하면 문자열을 그대로 대입 해주면 되고
    popup.classList     을 사용하면 메소드를 사용하면 된다.
    */

    //클래스 구분을 줘야 하기 때문에 'us-active'앞에 한칸 띄워줬다.
    popup.className = popup.className + " is-active";

    //메소드가 더욱 편하게 사용할 수 있다.
    popup.classList.add("is-active")

    //클래스가 있는지 확인하고 있으면 붙히지 말고 없으면 붙히자
    //popup.classList.contains("is-active") : is-active 클래스가 있는지 확인

/*    
     //문자열 버전
     let strArr = popup.className.split(" ");
     console.log("is-active")
   

    if(strArr.indexOf("is-active") != -1){
        //class 있으면
        //문자열 제거해서 클래스를 지울 수도 있고
    }
    else{
        //class 없으면
        popup.className = popup.className + " is-active";
    }
    
*/

    //메소드를 사용해서 조건 추가
    if(popup.classList.contains("is-active")){
        //is-active 있으면 제거
        popup.classList.remove("is-active");
        //remove: 클래스 제거 메소그
    }
    else{
        //is-active 없으면 추가
        popup.classList.add("is-active");
    }

}

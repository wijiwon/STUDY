// node.js에서 사용한 require 방식이 아닌
// ES6 문법
// 이름을 정해줄 수 있다.

// ./Components/LoginBtn에서 export {LoginBtn}으로 작성됨
// import {LoginBtn} from "./Components/LoginBtn";     // 구조분해할당으로 받는 경우는 export된 이름대로 적어야한다.

// 가져와서 Login이라는 이름으로 사용할 것이다.
import Login from "./Components/LoginBtn";

// 루트 요소 가상 DOM으로 생성
// 루트 설정
const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<Login />);

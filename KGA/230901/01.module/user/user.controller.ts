import { UserParams } from "./interface/login.request";
import UserService from "./service/user.service";

// 사용자 서비스 로직 클래스 정의
class UserController {
  constructor(private readonly userService: UserService) {}
  // ' /login/:type '해당 경로로 요청이 들어왔을 때 실행할 함수
  signin() {
//   signin(type) {
    // req.body 유저의 정보를 받아오고
    // 현재는 body에서 받아올 값이 없기 때문에 임시 객체 생성한다.
    const loginParams: UserParams = {
      email: "wee@naver.com",
      password: "1234",
    };
    this.userService.login("google", loginParams);
    // this.userService.login(type, loginParams);
  }
  // 회원가입
  // ' /signup ' 경로로 요청이 들어왔을 때 실행할 함수
  signup() {
    // 회원가입 로직
  }
}

export default UserController;

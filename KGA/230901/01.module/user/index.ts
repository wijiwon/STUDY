import UserService from "./service/user.service";
import Strategy from "./strategy/strategy";
import { GoogleAuthenticator } from "./strategy/google.stategy";
import { KakaoAuthenticator } from "./strategy/kakao.stategy";
import { EmailAuthenticator } from "./strategy/email.stategy";
import UserController from "./user.controller";

// 전략 패턴 객체 생성
const strategy = new Strategy();
// {strategy : {}, set(), login()} 해당 형식의 객체가 생성

strategy.set("email", new EmailAuthenticator());
// {strategy : {EmailAuthenticator{ authentcate }}, set(), login()}

strategy.set("kakao", new KakaoAuthenticator());
// {strategy : {EmailAuthenticator{ authentcate }, KakaoAuthenticator{ authentcate }}, set(), login()}

strategy.set("google", new GoogleAuthenticator());
// {strategy : {EmailAuthenticator{ authentcate }, KakaoAuthenticator{ authentcate }, GoogleAuthenticator{ authentcate }}, set(), login()}

// 완성된 객체를 유지 서비스. 클래스 생성자의 매개변수로 전달 및 유지 서비스 객체 생성
const userService = new UserService(strategy);

// 유저 로그인 로직 클래스 생성 및 유저 서비스 로직 객체 생성자 매개변수로 전달
const userController = new UserController(userService);

userController.signin();

// 매개변수를 받도록 설정하면 해당 방식으로 가능
// userController.signin("email");

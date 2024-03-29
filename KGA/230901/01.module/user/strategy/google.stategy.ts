import { UserParams } from "../interface/login.request";
import { AuthenticatonResponse, Authenticator } from "./Authenticator";

//검증 객체 구조 상슥
export class GoogleAuthenticator implements Authenticator {
  async authentcate(credentials: UserParams): Promise<AuthenticatonResponse> {
    // 구글 로그인 로직 작성 부분
    console.log("Google login 성공");
    console.log(credentials);
    // 반환값의 객체는 AuthenticatonResponse 인터페이스로 구조 정의 해놓은 것이다.
    return { success: true , message : "ㅊㅋㅊㅋ 구글 로그인 성공이다" };
  }
}

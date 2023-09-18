import { UserParams } from "../interface/login.request";
import { AuthenticatonResponse, Authenticator } from "./Authenticator";

// 이메일 로그인 검증 클래스 정의
export class EmailAuthenticator implements Authenticator {
  async authentcate(credentials: UserParams): Promise<AuthenticatonResponse> {
    // 이메일 로그인 로직 부분
    console.log("email login 성공");
    return { success: true };
  }
}

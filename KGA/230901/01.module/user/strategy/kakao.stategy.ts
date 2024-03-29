import { AuthenticatonResponse, Authenticator } from "./Authenticator";
import { UserParams } from "../interface/login.request";

// 검증 객체 구조 상속
export class KakaoAuthenticator implements Authenticator {
  async authentcate(credentials: UserParams): Promise<AuthenticatonResponse> {
    // 카카오 로그인 로직
    console.log("kakao login 성공");
    return { success: true };
  }
}

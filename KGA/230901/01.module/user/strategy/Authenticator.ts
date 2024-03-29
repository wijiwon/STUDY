import { UserParams } from "../interface/login.request";

// 응답 정보 객체 구조 정의
export interface AuthenticatonResponse {
  success: boolean;
  // message : 옵셔닝. 키가 있어도 되고, 없어도 되는 구조이다.
  message?: string;
}

// 검증 객체 구조 정의
export interface Authenticator {
  // 로그인 검증을 할 함수선언
  authentcate(credentials: UserParams): Promise<AuthenticatonResponse>;
}

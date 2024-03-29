// 로그인 가입 관련된 작업
// 카카오, 네이버, 구글

import { Strategy } from "./auth";


export interface AuthProps {
  email: string;
  password: string;
}

// 검증 결과에 대한 값과 메세지
interface AuthenticatonResponse {
  success: boolean;
  message?: string;
}
// 검증에 대한 인터페이스
interface Authenticator {
  // 검증에 대한 요청 처리
  authenticate(credentials: AuthProps): Promise<AuthenticatonResponse>;
}

// 이메일 로그인 로직 클래스
export class EmailAuthenticator implements Authenticator {
  async authenticate(credentials: AuthProps): Promise<AuthenticatonResponse> {
    // 로직은 없다. 요청과 응답 코드가 들어갈 부분
    console.log("email login");
    return { success: true };
  }
}

// 카카오 로그인 로직 클래그
export class KakaoAuthenticator implements Authenticator {
  async authenticate(credentials: AuthProps): Promise<AuthenticatonResponse> {
    // 카카오 로그인 로직 들어갈 부분
    console.log("kakao login");
    return { success: true };
  }
}

// 로그인에 대한 서비스를 처리할 클래스 구조
export interface LoginService {
  // 로그인 로직에 대한 함수 구조
  login(type: string, credentials: AuthProps): Promise<AuthenticatonResponse>;
}

// 로그인 클래스에 로그인 서비스 구조를 상속 받고
export class Login implements LoginService {
  // strategy 타입을 추가 해줘야 함
  constructor(private readonly strategy: Strategy) {}
  async login(
    type: "email" | "kakao",
    credentials: AuthProps
  ): Promise<AuthenticatonResponse> {
    // result : 로그인 로직이 들어있는 객체
    // 여기에서 어떤 로그인 로직으로 처리할 지 type 구분해서
    const result = await this.strategy[type].authenticate(credentials);
    return result;
  }
}

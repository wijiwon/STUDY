import { LottoNums } from "../interface/lotto.request";
import {
  AuthenticatonResponse,
  Authenticator,
} from "../stratedy/Authenticator";

export class Lotto8Authenticator implements Authenticator {
  async authenticate(credentials: LottoNums): Promise<AuthenticatonResponse> {
    // 로또번호 뽑는 함수 넣기
  }
}

import { LottoNums } from "../interface/lotto.request";

export interface AuthenticatonResponse {
  success: boolean;
  message?: string;
}

export interface Authenticator {
  authenticate(credentials: LottoNums): Promise<AuthenticatonResponse>;
}

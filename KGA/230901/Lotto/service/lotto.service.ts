import { LottoNums } from "../interface/lotto.request";
import { AuthenticatonResponse } from "../stratedy/Authenticator";

class LottoService{
    constructor(private readonly strategy:){}

    async selec(
        type:string,
        credentials:LottoNums
    ):Promise<AuthenticatonResponse>{
        const result = await this.strategy.
        return result
    }
}

export default LottoService
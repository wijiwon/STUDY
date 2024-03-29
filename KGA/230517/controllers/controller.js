const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const session = require("express-session");

const { UserInit, UserInsert, UserSelect, UserRefresh } = require("../models");
UserInit();


const createHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const compare = (password, hash) => {
    return bcrypt.compare(password, hash)
}


exports.SignUp = async (req, res) => {
    const { user_id, user_pw } = req.body;
    const hash = await createHash(user_pw);

    try {
        await UserInsert(user_id, hash);
        res.redirect("/login");
    } catch (error) {
        console.log(error)
        console.log("회원가입 에러")
    }
}


exports.Login = async (req, res) => {
    const { user_id, user_pw } = req.body;
    try {
        const result = await UserSelect(user_id);

        if (!result?.user_id) {
            console.log("아이디 틀림");
            return res.send("아이디 틀림");
        }

        const bcryptPW = await compare(user_pw, result.user_pw);
        if (!bcryptPW) {
            console.log("비밀번호 틀림");
            return res.send("비밀번호 틀림");
        }
        
        const accessToken = jwt.sign({
            user: result.user_id,
            nick: "dsfnj",
            email: "ndkwe@knfl.cnp"
        }, process.env.ACCESS_TOKEN, {
            expiresIn: "5s"
        })

        const refreshToken = jwt.sign({
            user: result.user_id
        }, process.env.REFRESH_TOKEN, {
            expiresIn: "20s"
        })

        
        req.session.access_token = accessToken;
        req.session.refresh_token = refreshToken;
        console.log("저장",req.session.refresh_token);
        await UserRefresh(user_id, refreshToken);
        res.redirect("/boardList");
    } catch (error) {
        console.log(error)
    }
}

exports.Verify = async (req, res, next) => {
    //Accesstoken 검사
    //틀리면 Refreshtoken 검사
    //틀리면 재로그인 - 재발급

    const { access_token, refresh_token } = req.session;
    console.log("리프레시토큰",refresh_token)
    console.log("세션",req.session)
    try {
        jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, acc_edcoded) => {
            if (err) {
                jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (err, ref_edcoded) => {

                    if (err) {
                        console.log("다시 로그인 하세요!");
                        res.send("다시 로그인 하세요!")
                    }

                    
                    console.log("유저아이디",ref_edcoded)
                    const { data } = await UserSelect(ref_edcoded.user);
                    if(data.refresh !== refresh_token){
                        console.log("중복 로그인임")
                        res.send("중복 로그인입니다.")
                    }
                    else {
                        const accessToken = jwt.sign({
                            user: data.user_id,
                            nick: "dsfnj",
                            email: "ndkwe@knfl.cnp"
                        }, process.env.ACCESS_TOKEN, {
                            expiresIn: "5s"
                        })
                        req.session.access_token = accessToken;
                        next();
                    }
                })
            }
            else {
                res.send("정상적인 토큰입니다.");
            }
        })
    } catch (error) {

    }

}
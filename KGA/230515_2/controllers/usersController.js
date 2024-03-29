const {userList, userInsert, userSelect, userRefresh, userDelete, userPwUpdate} = require("../models");
const jwt = require("jsonwebtoken");
const session=require('express-session');

exports.userList = async (req,res)=>{
    try {
        const data = await userList();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// 회원가입
exports.Signup = async (req,res)=>{
    const { user_id, user_pw } = req.body;
    try {
        await userInsert(user_id,user_pw);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
}

// 로그인
exports.Login = async (req,res)=>{
    const {user_id, user_pw} = req.body;
    try {
        const data = await userSelect(user_id);
        // 유저 조회가 되었으면 ' user_id '가 있겠죠?
        if(!data?.user_id){
            return res.send("아이디 없음");
        }

        if(data.user_pw !== user_pw){
            return res.send("비밀번호 틀림");
        }

        // 여기까지 통과하면 로그인 성공!
        // access token 발급
        const acessToken = jwt.sign({
            user_id : data.user_id,
            mail : "user_1@naver.com",
            nick : "user1"
        },process.env.ACCESS_TOKEN_KEY,{
            expiresIn: "5s"
        });
        // refresh token 발급
        const refreshToken = jwt.sign({
            user_id : data.user_id,
        }, process.env.REFRESH_TOKEN_KEY,{
            expiresIn: "20s"
        });

        await userRefresh(user_id, refreshToken);

        req.session.acess_Token = acessToken;
        req.session.refresh_Token = refreshToken;
        res.send({access : acessToken, refresh : refreshToken});

    } catch (error) {
        console.log(error);
    }
}

// 유저 토큰 검증
exports.verifyLogin = async (req,res, next)=>{
    // next 함수를 실행시켜주면 다음 미들웨어로 이동
    // res.send("여기서 끝");
    const { acess_Token, refresh_Token } = req.session;
    jwt.verify(acess_Token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded)=>{
        if(err){
            // Access 토큰이 썩은 토큰이면
            jwt.verify(refresh_Token, process.env.REFRESH_TOKEN_KEY, async(err, ref_decoded)=>{

                if(err){
                    console.log("refresh token 만료",err)
                    res.send("다시 로그인 하세요!")
                }
                else{
                    const data = await userSelect(ref_decoded.user_id);
                    if(data.refresh == refresh_Token){
                        const accessToken = jwt.sign({
                            user_id: ref_decoded.user_id
                        }, process.env.ACCESS_TOKEN_KEY,{
                            expiresIn : "5s"
                        })
                        req.session.acess_Token = accessToken;
                        console.log("access token 재발급");
                        next();
                    }
                    else{
                        res.send("중복 로그인 방지")
                    }
                }
            })
            console.log('반장1',err)
        }
        //엑세스 토큰이 유효하면
        else{
            console.log(acc_decoded)

            console.log("로그인 정상 유지 중!")
            next();
        }
    })
}
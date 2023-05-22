const { User, Post } = require("../models");

exports.BorderMain = async (req,res)=>{
    // 해당 유저의 마이 페이지
    const { acc_decoded } = req;
    console.log("acc_decoded",acc_decoded);
    const user = await User.findOne({where: {name: acc_decoded.name}});
    console.log("user",user)
    res.render("main", {data : user});
}

exports.createBorder = async (req,res)=>{
    // 글을 등록하는 함수
    // console.log("req확인가자",req)
    const { acc_decoded } = req;
    const { user_post } = req.body;
    console.log("acc_decoded",acc_decoded)
    console.log("user_post",user_post)
    // Post 테이블에 글 추가
    await Post.create({
        msg : user_post,
        user_id : acc_decoded.id
    });
    // 해당 유저가 작성한 글들을 볼 수 있는 페이지로 이동
    res.redirect(`/border/view/${acc_decoded.id}`)
}
exports.borderView = (req,res)=>{
    // 글 목록을 보여주는 함수
    User.findOne(
        {
            where : {id: req.params.id}, 
            include : [
                {model : Post}
            ]
        }
    ).then((e)=>{
        // (i)=> i.dataValues === (i)=> { retern i.dataValues}   화살표 함수는 {}가 빠지면 바로 반환시킨다. retern문 생략 가능.
        e.dataValues.Posts = e.dataValues.Posts.map((i)=> i.dataValues);
        const Posts = e.dataValues;
        res.render("border",{data:Posts});
    })

}

exports.updataBorder = async(req,res)=>{
    // 글을 수정하는 함수
    const { acc_decoded } = req;
    const { msg } = req.body;
    const { id } = req.params;
    // update(): 수정 메소드 사용. 값을 수정할 때 사용할 메서드
    // 첫 번째 매개변수: 객체로 전달. 수정할 값
    // 두 번째 매개변수: 객체로 전달. 조건. 수정할 내용을 찾아서
    await Post.update({msg},{where : {id}});
    res.redirect(`/border/view/${acc_decoded.id}`);
}

exports.borderDel = async(req,res)=>{
    // 글을 삭제하는 함수
    // 삭제 메소드 사용
    await Post.destroy({
        where : {id : req.params.id}
    });
    res.redirect('/border');
}
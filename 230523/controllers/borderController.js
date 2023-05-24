const { Sequelize } = require("sequelize");
const { User, Post } = require("../models");
const Op = Sequelize.Op;

// 전체 글 목록을 보여주는 함수
exports.PostAll = async (req,res)=>{
    const result = await Post.findAll({})
    console.log("글 목록은??", result);

    // const { acc_decoded } = req;
    // console.log("타입을 알려줘ㅇㄴㅇㅇ",typeof [Post]);
    // const userPost = Post.filter(posts=>
    //     posts.id == acc_decoded.id)
    // console.log("유저가 쓴 글 목록은?.....",userPost)
    return result

}

exports.postCreate = async(req,res)=>{
    const { acc_decoded } = req;
    const { title, content } = req.body;
    // console.log("확인 --------- ",acc_decoded.nick)
    // console.log("확인2 --------- ", acc_decoded.id)
    if(acc_decoded.level >= 1){
        await Post.create({
            title: title,
            content : content,
            user_id: acc_decoded.id,
            writer: acc_decoded.nick
        });
        res.redirect('/postList')
    }
    else{
        res.send("게시글 작성이 불가한 등급입니다.")
    }
}

exports.postView = async(req,res)=>{
    // const { id } = ;
    // console.log("아이디,,,?",id,` title);
    const result = await Post.findOne({
        where : {
            id : req.params.id
        }
        // include : [
        //     {model : Post}
        // ]
    })
    // 
    // const UserResult = await User.findAll({
    //     where : {
    //         user_level : {[Op.ne]: 0}
    //     }
    // })
    // console.log("유저내용 결과...?",UserResult);
    // console.log("결과는....?",result)
    // console.log("결과는....?",result.dataValues.id)
    return result;
}

exports.postDel = async(req,res)=>{
     // 선택한 글의 고유 값을 부르기 위한 함수
     const result = await Post.findOne({
        where : {
            id : req.params.id
        }
    })
    
    // 글 작성자에 대한 값
    const postWriter = await User.findOne({
        where: {
            id : result.user_id
        }
    })
    const { acc_decoded } = req;
    //현재 로그인한 유저의 값
    const UserResult = await User.findOne({
        where : {
            id : acc_decoded.id
        }
    })
    

    if(postWriter.id == UserResult.id){
        await Post.destroy({
            where : {id: req.params.id}
        });
        res.redirect('/postList')
    }
    else{
        res.send("작성자만 삭제 가능합니다!")
    }
}

exports.postUpdateView = async(req,res)=>{    
    // 선택한 글의 고유 값을 부르기 위한 함수
    const result = await Post.findOne({
        where : {
            id : req.params.id
        }
    })
    // console.log("불러온 값은....?",result);
    
    // 글 작성자에 대한 값
    const postWriter = await User.findOne({
        where: {
            id : result.user_id
        }
    })
    // console.log("불러온 작성자 값은....?",postWriter);
    const { acc_decoded } = req;
    //현재 로그인한 유저의 값
    const UserResult = await User.findOne({
        where : {
            id : acc_decoded.id
        }
    })
    // console.log("불러온 유저 값은....?",UserResult);
    

    if(postWriter.id == UserResult.id){
        res.render("update",{data:result});
    }
    else{
        res.send("작성자만 수정이 가능합니다!")
    }
}


exports.postUpdate = async(req,res)=>{
    const {title, content} = req.body;
    const {id} = req.params;
    
    await Post.update({title, content}, {where : {id}});
    res.redirect(`/view/${id}`);
}
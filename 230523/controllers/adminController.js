const { Sequelize } = require("sequelize");
const { User, Post } = require("../models");
const Op = Sequelize.Op;

// 전체 유저 목록을 보여주는 함수
exports.UserAll = async (req,res)=>{
    const result = await User.findAll({
        attributes : ['id','user_id','user_name','user_level'],
        where : {user_level: { [Op.ne]:3 }}
    });
    // console.log("유저목록",result)
    return result

}

exports.postCreate = async(req,res)=>{
    const { acc_decoded } = req;
    const { title, content } = req.body;
    // console.log("확인 --------- ",acc_decoded.nick)
    // console.log("확인2 --------- ", acc_decoded.id)

    await Post.create({
        title: title,
        content : content,
        user_id: acc_decoded.id,
        writer: acc_decoded.nick
    });
    res.redirect('/postList')
}

exports.userUpdate = async(req,res)=>{
    const { id } = req.params;
    // console.log("아이디는????", id)
    await User.update({
        user_level : 1
    },{
        where : {id}
    })
    res.redirect("/admin")
}

exports.userDel = async(req,res)=>{
    const {id} = req.params;
    await User.destroy({
        where : {id}
    });
    res.redirect("/admin")
}
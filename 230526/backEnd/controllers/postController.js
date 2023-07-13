const { Post, User } = require("../models");

exports.PostAll = async(req,res)=>{
    const post = await Post.findAll({})
    // console.log("넘어옴???", post)
    // console.log("이건??? 넘어옴???", post.dataValues)
    res.json(post)
}

exports.myPost = async(req,res)=>{
    // console.log("sdjlfnljQEB;LWV JLJQWNWF;K",Post)
    const { acc_decoded } = req;
    const post = await Post.findAll({where : {user_id : acc_decoded.id}})
    console.log("넘어옴???", post)
    // console.log("이건??? 넘어옴???", post.dataValues)
    res.json(post)
}

exports.PostCreate = async(req,res)=>{
    // console.log("------------------",req)
    // console.log("넘어가지니?")
    const { acc_decoded } = req;
    // console.log("acc_decoded",acc_decoded);
    const { title, content } = req.body;
    // console.log("%%%%%%%%%%%%%%%",title, content);
    await Post.create({
        title: title,
        content: content,
        user_id: acc_decoded.id
    })
    return res.redirect('http://127.0.0.1:5500/frontEnd/main.html')
}

exports.PostUpdate = async (req,res)=>{  
    const { id } = req.params;
    const { postT, postC } = req.body;

    await Post.update({title:postT, content: postC}, {where:{id : id}})
    res.redirect('http://127.0.0.1:5500/frontEnd/main.html')
}

exports.PostDel = async (req,res)=>{
    const { id } = req.params;
    await Post.destroy({where: {id:id}})

    res.redirect('http://127.0.0.1:5500/frontEnd/main.html')
}
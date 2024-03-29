const { User } = require("../models");

exports.UserView = async(req,res)=>{
    try {
        console.log("넘어와?")
        const { acc_decoded } = req;
        const result = await User.findOne({where:{id: acc_decoded.id}})
        // console.log("--------------",result);
        res.json(result);
    } catch (error) {
        console.log(error)
    }
} 

exports.ImgUpdate = async(req,res)=>{
    try {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",req.file);
        const {file, acc_decoded} = req;
        await User.update({user_img: "http://localhost:8080/img/" + file.filename} , {where : {id: acc_decoded.id}})
        res.redirect("http://127.0.0.1:5501/frontEnd/mypage.html")
    } catch (error) {
        console.log(error)
    }
}

exports.NameUpdate = async(req,res)=>{
    try {
        const { acc_decoded } = req;
        const { nick } = req.body;
        await User.update({user_name: nick}, {where: {id: acc_decoded.id}}); 
        res.redirect("http://127.0.0.1:5501/frontEnd/mypage.html")
    } catch (error) {
        console.log(error)
    }
}
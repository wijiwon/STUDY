const router = require("express").Router();
const { UserView, ImgUpdate, NameUpdate } = require("../controller/mypageController")
const { isLogin } = require("../middleware/loginmid")
const { Upload } = require("../middleware/imgUpload")


router.get("/", isLogin ,UserView)

router.post("/imgUpdate", isLogin, Upload.single("upload"), ImgUpdate);

router.post("/nameUpdate", isLogin, NameUpdate);

module.exports = router;
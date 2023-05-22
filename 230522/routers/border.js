const router = require("express").Router();
const { isLogin } = require("../middleware/login");
const { BorderMain, borderView, borderDel, createBorder, updataBorder } = require("../controllers/borderController");
const { post } = require("./signUp");


// login 페이지를 넘어가면 isLogin으로 로그인 유무 확인, BorderMain을 실행
router.get('/',isLogin,BorderMain);

router.get('/view/:id', isLogin, borderView);

router.post('/create_border', isLogin, createBorder);

router.post('/view_update/:id', isLogin, updataBorder);

router.get('/del/:id', isLogin, borderDel);

module.exports = router;
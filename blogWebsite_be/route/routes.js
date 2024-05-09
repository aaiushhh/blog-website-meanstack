var express=require("express");

var loginController=require("../src/login/loginController");
var whoLoggedController = require("../src/whoLogged/whoLoggedController");
var blogController=require("../src/blog/blogController")

const router=express.Router();

router.route('/login/login').post(loginController.loginLoginControllerFn);
router.route('/login/create').post(loginController.createLoginControllerFn);
router.route('/login/users').get( loginController.getAllUserDataControllerFn)
router.delete('/login/users/:id', loginController.deleteUserByIdControllerFn);
router.get('/login/email/:username', loginController.getEmailByUsernameControllerFn);

//jugad
router.get('/whoLogged/fetch', whoLoggedController.getWhoLoggedFn);
router.delete('/whoLogged/del', whoLoggedController.delWhoLoggedFn);
router.post('/whoLogged/create', whoLoggedController.whoLoggedcreateLoginControllerFn);

//blog
router.route('/blog/create').post(blogController.createBlogControllerFn);
router.route('/blog/blogs').get(blogController.getAllBlogDataControllerFn);
router.get('/blog/title/:title', blogController.getBlogsByTitleControllerFn);

module.exports = router;
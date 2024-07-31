const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const router = require("express").Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);

router.use(authentication);

router.get("/books", Controller.findAvailableBooks);
router.get("/my-book", Controller.findMyBook);
router.patch("/user-status", Controller.changeUserStatus);
router.patch("/book-status/:bookId", Controller.changeBookStatus);
router.get("/userInfo", Controller.userInfo);

router.use(authorization);
router.get("/all-books", Controller.findAllBooks);

module.exports = router;

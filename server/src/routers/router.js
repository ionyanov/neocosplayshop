const Router = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const defResponse = function (req, res) {
    return res.json({
        message: 'Method not supported!!',
        method: 'get',
        path: req.originalUrl
    })
}

const router = new Router();
//user
const userRouter = new Router();
userRouter.post('/', userController.login);
userRouter.get('/', authMiddleware, userController.check);
router.use('/login', userRouter);

router.get('*', defResponse);

module.exports = router
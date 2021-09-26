const express = require("express")
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/register',authController.signup)
router.post('/login',authController.login)

//using the below route we will authenticate teh user by checking that whether he is logged in or not
router.get('/user',authController.get_user)


module.exports = router;
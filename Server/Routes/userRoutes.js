const router=require('express').Router()
const userController=require('../Controllers/userController')


router.post('/register',userController.registerController)
router.post('/login',userController.loginController)
router.post('/setAvatar',userController.setAvatarController)
router.post('/getAvatar',userController.getAvatarController)
router.post('/getContacts',userController.getContactsController)


module.exports=router
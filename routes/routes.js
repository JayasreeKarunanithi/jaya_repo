import  Express  from "express";
import verifyjwt from '../middleware/auth.js'
import {createUser,getUser, updateUser , deleteUser ,loginUser} from '../controller/userController.js'

const router=Express.Router()

// user
router.post('/createUser',verifyjwt,createUser )
router.get('/getUser',verifyjwt, getUser )
router.patch('/updateUser',verifyjwt,updateUser)
router.delete('/deleteUser',verifyjwt,deleteUser)
router.post('/login', verifyjwt,loginUser)


export default router;
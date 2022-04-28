import express from 'express'
import { user_controller } from '../controller/user_controller.js'
var user_router = express.Router();

user_router.get('/user/:username', user_controller.getUser )

user_router.post('/user', user_controller.addUser )

user_router.put('/user', user_controller.updateUser )

user_router.delete('/user', user_controller.deleteUser )

export default user_router

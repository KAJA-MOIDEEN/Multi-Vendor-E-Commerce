import expreess from 'express'
import { addToCart,getUserCart,updateCart } from '../controllers/cart.controller.js'
import authUser from '../middleware/auth.js'

const cartRouter = expreess.Router()

cartRouter.get('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter
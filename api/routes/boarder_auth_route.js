import express from 'express'
import { signup, signin, signout, getBoarder } from '../controllers/boarder_auth_controller.js'

const router = express.Router();

router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.get('/auth/signout', signout)
router.get('/getBoarder', getBoarder)

export default router

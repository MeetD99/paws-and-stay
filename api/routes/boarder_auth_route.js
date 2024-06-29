import express from 'express'
import { signup, signin, signout, getBoarder, upServices, myservices } from '../controllers/boarder_auth_controller.js'

const router = express.Router();

router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.get('/auth/signout', signout)
router.get('/getBoarder', getBoarder)
router.post('/update/services', upServices)
router.post('/myservices', myservices)

export default router

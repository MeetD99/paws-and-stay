import express from 'express'
import { create, getPets } from '../controllers/pet_controller.js'

const router = express.Router();

router.post('/add', create)
router.post('/getPets', getPets)

export default router

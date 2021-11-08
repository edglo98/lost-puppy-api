import { Router } from 'express'
import { addPet } from '../controllers/pet.js'
const router = Router()

router.post('/', addPet)

export default router

import { Router } from 'express'
import { addPet, getPet, getPets } from '../controllers/pet.js'
const router = Router()

router.post('/', addPet)
router.get('/', getPets)
router.get('/:id', getPet)

export default router

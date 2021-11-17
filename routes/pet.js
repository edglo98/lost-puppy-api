import { Router } from 'express'
import { addPet, getPet, getPets, getPeyByUserID, editPet, deletePet } from '../controllers/pet.js'
const router = Router()

router.post('/', addPet)
router.get('/', getPets)
router.get('/:id', getPet)
router.post('/byUser', getPeyByUserID)
router.put('/', editPet)
router.delete('/:id', deletePet)

export default router

import { Router } from 'express'
import { addReport, editCheked, getReport, getReports, getChat } from '../controllers/reports.js'
const router = Router()

router.post('/', addReport)
router.put('/:id', editCheked)
router.get('/:id', getReports)
router.get('/:id', getReport)
router.get('/chat/user/', getChat)

export default router

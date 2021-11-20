import { Router } from 'express'
import { addReport, editCheked, getReport, getReports } from '../controllers/reports.js'
const router = Router()

router.post('/', addReport)
router.put('/:id', editCheked)
router.get('/', getReports)
router.get('/:id', getReport)

export default router

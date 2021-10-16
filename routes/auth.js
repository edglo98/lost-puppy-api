import { Router } from 'express'
import { check } from 'express-validator'
import { googleAuth, login, renewToken } from '../controllers/auth.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'
import { isEmailTaked } from '../helpers/dbValidator.js'

const router = Router()
const validator = [
  check('token', 'Token is required').not().isEmpty(),
  check('email', 'Email is required').isEmail().custom(isEmailTaked),
  verifyFields
]

// Registrar
router.post('/google', validator, googleAuth)

// Login
router.post('/login', [
  check('token', 'Token is required').not().isEmpty(),
  verifyFields
], login)

// Renovar token
router.get('/renew', verifyJWT, renewToken)

export default router

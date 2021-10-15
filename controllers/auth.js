import { response } from 'express'
import { validarGoogleToken } from '../helpers/googleVerifyToken.js'
import { generarJWT } from '../helpers/JWT.js'

import Users from '../models/mongo/users.js'

// Registro de usuarios
export const googleAuth = async (req, res = response) => {
  const { token } = req.body

  const googleUser = await validarGoogleToken(token)
  try {
    if (!googleUser) {
      return res.status(400).json({
        ok: false,
        msg: 'No se verificó el token'
      })
    }

    const addNewUser = new Users({
      name: googleUser.name,
      email: googleUser.email,
      // password: 'javiernoh'
      picturePath: googleUser.picture,
      isGoogleSignIn: true
    })
    await addNewUser.save()

    const token = await generarJWT(addNewUser.uid)

    return res.status(200).json({
      ok: true,
      msg: addNewUser,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

// Login
export const login = async (req, res = response) => {
  const { token } = req.body

  const googleUser = await validarGoogleToken(token)
  try {
    if (!googleUser) {
      return res.status(400).json({
        ok: false,
        msg: 'No se verificó el token'
      })
    }

    const user = await Users.findOne({ email: googleUser.email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales no encontradas'
      })
    }
    const token = await generarJWT(user._id)

    return res.status(200).json({
      ok: true,
      msg: user,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const renewToken = async (req, res = response) => {
  const uid = req.id

  const token = await generarJWT(uid)

  const user = await Users.findById(uid)

  res.json({
    ok: true,
    msg: user,
    token
  })
}

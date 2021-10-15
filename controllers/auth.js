import { response } from 'express'
import { validarGoogleToken } from '../helpers/googleVerifyToken.js'
import { generarJWT } from '../helpers/JWT.js'

import Users from '../models/mongo/users.js'

export const googleAuth = async (req, res = response) => {
  const { token } = req.body
  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay el token'
    })
  }

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

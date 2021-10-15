import User from '../models/mongo/users.js'

export const isEmailTaked = async (email) => {
  const existeEmail = await User.findOne({ email })
  console.log(existeEmail)
  if (existeEmail) throw new Error('Email has already been taken')
}

import { response } from 'express'
import Pets from '../models/mongo/pets.js'

export const addPet = async (req, res = response) => {
  try {
    const { name, gender, age, breed, description, profileImg, objIMG } = req.body

    const newPet = new Pets({
      name,
      gender,
      age,
      breed,
      description,
      profileImg,
      objIMG,
      date: new Date().toISOString()
    })
    await newPet.save()
    res.status(200).json({
      ok: true,
      msg: newPet
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

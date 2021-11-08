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
    return res.status(200).json({
      ok: true,
      msg: newPet
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getPets = async (req, res = response) => {
  try {
    const allPets = await Pets.find({})
    return res.status(200).json({
      ok: true,
      msg: allPets
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getPet = async (req, res = response) => {
  try {
    const { id } = req.params
    const pet = await Pets.findById(id)
    if (!pet) {
      return res.status(400).json({
        ok: false,
        msg: 'Pet not found'
      })
    }
    return res.status(200).json({
      ok: true,
      msg: pet
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

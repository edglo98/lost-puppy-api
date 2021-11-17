import { response } from 'express'
import Pets from '../models/mongo/pets.js'

export const addPet = async (req, res = response) => {
  try {
    const { name, gender, age, breed, description, profileImg, objIMG, user } = req.body

    const newPet = new Pets({
      name,
      gender,
      age,
      breed,
      description,
      profileImg,
      objIMG,
      isLost: true,
      user: JSON.parse(user)._id,
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

export const editPet = async (req, res = response) => {
  try {
    const { name, gender, age, breed, description, isLost, id } = req.body

    const putPet = await Pets.findByIdAndUpdate(id)
    putPet.name = name
    putPet.gender = gender
    putPet.age = age
    putPet.breed = breed
    putPet.description = description
    putPet.isLost = isLost

    await putPet.save()
    return res.status(200).json({
      ok: true,
      msg: putPet
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const deletePet = async (req, res = response) => {
  try {
    const { id } = req.params

    const delPet = await Pets.findByIdAndDelete(id)

    return res.status(200).json({
      ok: true,
      msg: delPet
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getPets = async (req, res = response) => {
  try {
    const allPets = await Pets.find({ isLost: true }).populate('user')
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

export const getPeyByUserID = async (req, res = response) => {
  try {
    const { id, isLost } = req.body
    const search = {
      user: id
    }
    if (isLost !== 'null') search.isLost = isLost

    const pets = await Pets.find(search).populate('user')
    res.status(200).json({
      ok: true,
      msg: pets
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

import { response } from 'express'
import Reports from '../models/mongo/reports.js'

export const getReports = async (req, res = response) => {
  try {
    const allReports = await Reports.find({}).populate({ path: 'pet', populate: 'user' }).populate('msgUser')
    return res.status(200).json({
      ok: true,
      msg: allReports
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getReport = async (req, res = response) => {
  try {
    const { id } = req.params
    const report = await Reports.findById(id)

    return res.status(200).json({
      ok: true,
      msg: report
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const addReport = async (req, res = response) => {
  try {
    const { description, pet, user } = req.body
    const newReport = new Reports({
      description,
      pet: JSON.parse(pet).id,
      date: new Date().toISOString(),
      msgUser: JSON.parse(user)._id,
      isCheked: false
    })

    await newReport.save()
    return res.status(200).json({
      ok: true,
      res: newReport
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const editCheked = async (req, res = response) => {
  try {
    const { id } = req.params
    const editReport = await Reports.findByIdAndUpdate(id)
    editReport.isCheked = true

    await editReport.save()

    return res.status(200).json({
      ok: true,
      msg: editReport
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getChat = async (req, res = response) => {
  try {
    const { id } = req.params
    const chat = await Reports.find({ pet: id }).populate({ path: 'pet', populate: 'user' }).populate('msgUser').sort({ date: -1 })
    return res.status(200).json({
      ok: true,
      msg: chat
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

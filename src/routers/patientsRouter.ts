import express from 'express'
import patientsService from '../services/patientsService'
import toNewPatient from '../utils'
const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
  const patients = patientsService.getPatients()
  res.send(patients)
})

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    patientsService.addPatient(newPatient)
    res.json(newPatient)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default patientsRouter

import express from 'express'
import patientsService from '../services/patientsService'
import utils from '../utils'
const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
  const patients = patientsService.getPatients()
  res.send(patients)
})

patientsRouter.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id)
  if (patient !== null && patient !== undefined) {
    console.log(patient)
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body)
    patientsService.addPatient(newPatient)
    res.json(newPatient)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})
patientsRouter.post('/:id/entries', (req, res) => {
  const newEntry = utils.toNewEntry(req.body)
  const patient = patientsService.getPatient(req.params.id)
  if (patient === null || patient === undefined) {
    res.sendStatus(404)
    return
  }
  try {
    const entry = patientsService.addEntry(patient, newEntry)
    res.json(entry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})
export default patientsRouter

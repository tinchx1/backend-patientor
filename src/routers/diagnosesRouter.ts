import express from 'express'
import getDiagnoses from '../services/diagnosesService'
const diagnosesRouter = express.Router()

diagnosesRouter.get('/', (_req, res) => {
  const diagnoses = getDiagnoses()
  res.send(diagnoses)
})

export default diagnosesRouter

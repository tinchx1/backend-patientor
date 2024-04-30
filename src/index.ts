import express from 'express'
import diagnosesRouter from './routers/diagnosesRouter'
import patientsRouter from './routers/patientsRouter'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.get('/api/ping', (_req, res) => {
  res.send('Hello World!')
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

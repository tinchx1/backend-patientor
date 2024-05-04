import patients from '../data/patients'
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types'
import { v1 as uuid } from 'uuid'

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => {
    return {
      id,
      name,
      occupation,
      gender,
      dateOfBirth
    }
  })
}

const getPatient = (idFind: string): NonSensitivePatient | undefined => {
  const cleanedId = idFind.startsWith(':') ? idFind.slice(1) : idFind
  const patient = patients.find(patient => patient.id === cleanedId)
  if (patient === null || patient === undefined) {
    return undefined
  }
  return patient
}

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    ...newPatient,
    id: uuid(),
    entries: []
  }
  patients.push(patient)
  return patient
}

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
  const entry = {
    ...newEntry,
    id: uuid()
  }
  patient.entries.push(entry)
  return entry
}
export default { getPatients, addPatient, getPatient, addEntry }

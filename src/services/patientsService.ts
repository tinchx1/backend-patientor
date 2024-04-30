import patients from '../data/patients'
import { NewPatient, NonSensitivePatient, Patient } from '../types'
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
const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    ...newPatient,
    id: uuid()
  }
  patients.push(patient)
  return patient
}
export default { getPatients, addPatient }

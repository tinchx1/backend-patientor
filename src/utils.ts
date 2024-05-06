import { Diagnose, Discharge, NewEntry, NewPatient, sickLeave } from './types'
import { Gender, HealthCheckRating } from './enums'

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String
}
const parseString = (string: any): string => {
  if (!isString(string)) {
    throw new Error('Incorrect or missing string')
  }
  return string
}
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
const parseDate = (date: any): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date')
  }
  return date
}
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}
const parseGender = (gender: any): Gender => {
  if (!isGender(gender)) {
    throw new Error('Incorrect or missing')
  }
  return gender
}
const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  }
  return newPatient
}
const parseDiagnosisCodes = (object: any): Array<Diagnose['code']> => {
  if (typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>
  }

  return object.diagnosisCodes as Array<Diagnose['code']>
}
const parseSickLeave = (object: any): sickLeave => {
  if (!(object?.startDate !== undefined) || !(object.endDate !== undefined)) {
    throw new Error('Incorrect or missing sick leave')
  }
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate)
  }
}
const parseDischarge = (object: any): Discharge => {
  if (!(object?.date !== undefined) || !(object.criteria !== undefined)) {
    throw new Error('Incorrect or missing discharge')
  }
  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria)
  }
}
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}
const parseHealthCheckRating = (object: any): HealthCheckRating => {
  object = Number(object)
  if (object === null || object === undefined || !isHealthCheckRating(object)) {
    throw new Error('Incorrect or missing health check rating')
  }
  return object
}
const toNewEntry = (object: any): NewEntry => {
  let newEntry: NewEntry

  switch (object.type) {
    case 'Hospital':
      newEntry = {
        type: 'Hospital',
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge)
      }
      break
    case 'OccupationalHealthcare':
      newEntry = {
        type: 'OccupationalHealthcare',
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      }
      break
    case 'HealthCheck':
      newEntry = {
        type: 'HealthCheck',
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
      break
    default:
      throw new Error('Unknown type')
  }

  return newEntry
}

export default { toNewPatient, toNewEntry }

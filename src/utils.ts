import { NewPatient } from './types'
import { Gender } from './enums'

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
export default toNewPatient

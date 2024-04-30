import { Gender } from './enums'

export interface Diagnose {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
}

export type NewPatient = Omit<Patient, 'id'>
export type NonSensitivePatient = Omit<Patient, 'ssn'>

import { Gender, HealthCheckRating } from './enums'

export interface Diagnose {
  code: string
  name: string
  latin?: string
}
interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnose['code']>
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}
export interface sickLeave {
  startDate: string
  endDate: string
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: sickLeave
}
export interface Discharge {
  date: string
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry
export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
export type NewEntry = UnionOmit<Entry, 'id'>
export type NewPatient = Omit<Patient, 'id', 'entries'>
export type NonSensitivePatient = Omit<Patient, 'ssn', 'entries'>

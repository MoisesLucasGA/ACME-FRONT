import type { SexEnum } from "@/enums/sexEnum"
import type { Patient } from "./getPatient"
import type { PatientStatus } from "@/enums/patientStatusEnum"

export type CreatePatientParams = {
  name: string
  birthdate: Date
  cpf: string
  sex: SexEnum
  status: PatientStatus
  zipCode: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement?: string
}

export type CreatePatientResponse = {
  success: boolean;
  error: string;
  data: Patient;
}
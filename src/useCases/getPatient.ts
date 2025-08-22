import type { PatientStatus } from "@/enums/patientStatusEnum"
import type { SexEnum } from "@/enums/sexEnum"

export type GetPatientsParams = {
  search?: string,
  status?: number
}

export type GetPatientsResponse = {
  success: boolean;
  error: string;
  data: Patient[];
}

export type Patient = {
  patientId: number
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
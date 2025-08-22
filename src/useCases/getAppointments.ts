import type { AppointmentStatus } from "@/enums/appointmentStatusEnum"

export type GetAppointmentsParams = {
  patientId?: number
  initialDate?: Date
  finalDate?: Date
  status?: AppointmentStatus
}

export type GetAppointmentsResponse = {
    success: boolean;
    error: string;
    data: Appointment[];
}

export type Appointment = {
    appointmentId: number
    date: Date
    patientId: number
    status: AppointmentStatus
    name: string
    cpf: string
}
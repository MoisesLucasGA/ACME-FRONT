import type { Appointment } from "./getAppointments"
import type { AppointmentStatus } from "@/enums/appointmentStatusEnum"

export type CreateAppointmentParams = {
    date: Date
    patientId: number
    description: string
    status: AppointmentStatus
}

export type CreateAppointmentResponse = {
  success: boolean;
  error: string;
  data: Appointment;
}
import { Appointmens } from "@/pages/Appointment"
import { Home } from "@/pages/Home"
import { Patients } from "@/pages/Patients"
import { Route, Routes } from "react-router"

export const Router = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/patients" element={<Patients/>} />
            <Route path="/appointments" element={<Appointmens />} />
        </Routes>
    )
}
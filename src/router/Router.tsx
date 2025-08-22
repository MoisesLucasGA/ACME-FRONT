import { Patients } from "@/pages/Patients"
import { Route, Routes } from "react-router"

export const Router = () => {
    return (
        <Routes>
            <Route index path="/" element={<>oiassaads</>} />
            <Route path="/patients" element={<Patients/>} />
        </Routes>
    )
}
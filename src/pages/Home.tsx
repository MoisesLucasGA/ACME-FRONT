import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-[100vh]">
      <h1 className="text-5xl font-bold">Ola!, Seja bem-vindo</h1>

      <div className="flex flex-row justify-center items-center gap-2">
      <Button onClick={() => navigate("patients")} className="font-bold">Pacientes</Button>
      <Button onClick={() => navigate("appointments")} className="font-bold">Atendimentos</Button>
      </div>
    </div>
  );
};

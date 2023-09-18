import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListaPacientes from "./components/ListaPacientes";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const pacientesLocal = JSON.parse(localStorage.getItem("pacientes")) ?? [];
    setPacientes(pacientesLocal);
  }, []);

  useEffect(() => {
    console.log(pacientes);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = (id) => {
    const pacientesActuales = pacientes.filter(
      (pacienteActual) => pacienteActual.id != id
    );
    setPacientes([...pacientesActuales]);
  };
  return (
    <div className="container mx-auto mt-14">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListaPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;

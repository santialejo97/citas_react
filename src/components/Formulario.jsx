import { useState, useEffect } from "react";
import Error from "./Error";

// eslint-disable-next-line react/prop-types
const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      // eslint-disable-next-line react/prop-types
      setNombre(paciente.nombre);
      // eslint-disable-next-line react/prop-types
      setPropietario(paciente.propietario);
      // eslint-disable-next-line react/prop-types
      setAlta(paciente.alta);
      // eslint-disable-next-line react/prop-types
      setEmail(paciente.email);
      // eslint-disable-next-line react/prop-types
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar el formulario
    if ([nombre, propietario, email, alta, sintomas].includes("")) {
      console.log("hay un campo vacio");
      setError(true);
      return;
    }
    setError(false);
    // Objecto de paciente y agregar a el state pacientes
    const objectPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas,
    };

    // eslint-disable-next-line react/prop-types
    if (paciente.id) {
      // Editando Paciente
      objectPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id == paciente.id ? objectPaciente : pacienteState
      );
      setPacientes([...pacientesActualizados]);
      setPaciente({});
    } else {
      // Nuevo Registro
      (objectPaciente.id = generarId()),
        setPacientes([...pacientes, objectPaciente]);
    }
    // Reiniciar form
    setNombre("");
    setAlta("");
    setEmail("");
    setPropietario("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}{" "}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold">
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full mt-2 p-2 rounded-md"
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 transition-all text-white cursor-pointer hover:bg-indigo-700 uppercase font-bold"
          value={paciente.id ? "Actualiza Paciente" : "Agregar PAciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;

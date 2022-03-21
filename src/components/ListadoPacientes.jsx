import { usePacientes } from '../hooks/usePacientes'
import { Paciente } from './Paciente'

export const ListadoPacientes = () => {
  const { pacientes } = usePacientes()

  return (
    <div className="container gap-8">
      <h2 className="font-black text-indigo-800 text-3xl text-center mb-2">Listado de Pacientes</h2>
      <hr/>
      {pacientes.length ? (
        <div className="mt-4">
          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-xl mt-5 mb-10 text-center text-indigo-700">
            No se encontro ningun paciente.
          </p>
        </>
      )}
    </div>
  )
}

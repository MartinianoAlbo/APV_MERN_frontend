import {usePacientes} from '../hooks/usePacientes'
import '../styles/styles.css'


export const Paciente = ({ paciente }) => {

  const { modificarPaciente, eliminarPaciente } = usePacientes();
  const { nombre, email, propietario, telefono, fecha_alta, _id, sintomas } = paciente;
  

  const formatearFecha = (fecha) => {
      const nuevaFecha = new Date(fecha_alta);
      return new Intl.DateTimeFormat('es-AR', {dateStyle: 'long'}).format(nuevaFecha)
  }

  return (
    <div className="">
      <div className="bg-white shadow-lg shadow-slate-300 overflow-hidden border rounded-lg mt-4 ">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium capitalize text-gray-900">
            Informacion del Paciente <span className="font-bold text-indigo-700">{' '}{nombre}</span> 
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalles del paciente, tratamiento y sintomas.
          </p>
        </div>
        <div className=" border-t border-gray-200 ">
          <dl className="divide-y divide-slate-200">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nombre de Paciente</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {nombre}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Propietario</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {propietario}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Telefono
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {telefono}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Fecha de Alta
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatearFecha(fecha_alta)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Sintomas</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {sintomas}
              </dd>
            </div>
            <div className="flex justify-end">
            <button onClick={() => modificarPaciente(paciente)} className='text-blue-700 text-md p-6 '>📝 Modificar</button>
            <button onClick={() => eliminarPaciente(_id)} className='text-red-700 text-md p-6 '>❌ Eliminar</button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

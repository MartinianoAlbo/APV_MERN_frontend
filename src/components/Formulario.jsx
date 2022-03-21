import { useState, useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import {Alerta} from '../components/Alerta'
import { usePacientes } from '../hooks/usePacientes'
import '../styles/styles.css'


export const Formulario = () => {
  const [formValues, handleInputChange, reset, setValues] = useForm({
    nombre: '',
    propietario: '',
    email: '',
    telefono: '',
    fecha_alta: '',
    sintomas: '',
  })

  const {
    nombre,
    propietario,
    email,
    telefono,
    fecha_alta,
    sintomas,
  } = formValues

  const [alerta, setAlerta] = useState({})
  const [id, setId] = useState(null)

  const {paciente, guardarPaciente} = usePacientes()

  useEffect(() => {

    if(paciente?._id){
      setId(paciente._id)
      setValues({
        nombre: paciente.nombre, //
        propietario: paciente.propietario, //
        email: paciente.email, //
        telefono: paciente.telefono,
        fecha_alta: paciente.fecha_alta, //
        sintomas: paciente.sintomas
      })
    }
    // (new Date().toISOString())
    return
    
  }, [paciente])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    guardarPaciente({
      id,
      nombre,
      propietario,
      email,
      telefono,
      fecha_alta,
      sintomas,

    })

    setAlerta({msg: '✅ Guardado Correctamente'})

    reset()
    
  }

  const {msg} = alerta;

  return (
    <>
      <div className=" ">
        <div className=" md:grid md:grid-cols-2 sm:grid sm:grid-row-1/2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2 ">
            <form onSubmit={handleSubmit}>
              <div className="shadow rounded-lg sm:rounded-md sm:overflow-hidden block md:mr-6 ">
                <div className="px-4 py-5 bg-indigo-100 space-y-6 sm:p-6">
                  <label
                    htmlFor="nombre"
                    className="block text-lg text-center border rounded-lg mb-2 shadow-lg p-1 font-bold text-white bg-indigo-900 w-full"
                  >
                    Registgrar un pacientes
                  </label>
                  <div className="grid grid-cols-3 gap-6">
                    {/* NOMBRE */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        onChange={handleInputChange}
                        value={nombre}
                        name="nombre"
                        id="nombre"
                        required
                        autoComplete="off"
                        className="p-1 mt-1 border focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md capitalize"
                      />
                    </div>
                    {/* PROPIETARIO */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="propietario"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Propietario
                      </label>
                      <input
                        type="text"
                        onChange={handleInputChange}
                        value={propietario}
                        name="propietario"
                        id="propietario"
                        required
                        autoComplete="off"
                        className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md capitalize"
                      />
                    </div>

                    {/* EMAIL */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        onChange={handleInputChange}
                        value={email}
                        name="email"
                        id="email"
                        required
                        autoComplete="email"
                        className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* TELEFONO */}

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Telefono
                      </label>
                      <input
                        type="text"
                        onChange={handleInputChange}
                        value={telefono}
                        name="telefono"
                        id="telefono"
                        required
                        autoComplete="off"
                        className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* FECHA */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="fecha_alta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fecha
                      </label>
                      <div className="mt-1 flex rounded-md shadow-md">
                        <input
                          type="date"
                          onChange={handleInputChange}
                          value={fecha_alta}
                          name="fecha_alta"
                          id="fecha_alta"
                          required
                          className="p-1 mt-1 border  focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  {/* SINTOMAS */}
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sintomas
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="sintomas"
                        name="sintomas"
                        rows="3"
                        onChange={handleInputChange}
                        value={sintomas}
                        required
                        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-1"
                        placeholder="Sintomas...."
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Breve descripcion de los sintomas del paciente
                    </p>
                  </div>
                  <div className="px-2 py-1 text-right sm:px-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {id ? 'Guardar Cambios' : 'Agregar Paciente'}
                  </button>
                </div>
                </div>
          
              </div>
            </form>
            {
              msg && <Alerta alerta={alerta} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

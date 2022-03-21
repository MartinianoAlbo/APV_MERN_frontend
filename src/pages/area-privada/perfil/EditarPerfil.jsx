import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import {Alerta} from '../../../components/Alerta'
import {useForm} from '../../../hooks/useForm'
import { fileUpload } from '../../../helpers/fileUpload'

export const EditarPerfil = () => {

  const { auth, actualizarPerfil, guardarPassword } = useAuth()
  const [perfil, setPerfil] = useState({})
  const [alerta, setAlerta] = useState({})
  const [formValues, handleInputChange, reset] = useForm({
    pass: '',
    new_pass: ''
  })
  

  useEffect(() => {
    setPerfil(auth)
  }, [auth])

  const { pass, new_pass } = formValues
  const { nombre, telefono, email} = perfil

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    
    setPerfil({
      ...perfil,
      [e.target.name] : file.name
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre, email].includes('')){
        setAlerta({
          msg: 'Nombre y Email son obligatorios',
          error: true
        })
        return
    }

    const resultado = await actualizarPerfil(perfil)
    setAlerta(resultado)
  }

  const handleSubmitContraseña = async (e) => {
    e.preventDefault()

    if(Object.values(formValues).some(campo => campo === '')){
      setAlerta({
        msg: '❌ Los dos campos son obligatorios',
        error: true
      })
      return
    }

    if(pass.length < 3 ){
      setAlerta({
        msg: '❌ La contraseña debe tener minimo 4 caracteres',
        error: true
      })
      return
    }

    const respuesta = await guardarPassword(formValues)
    setAlerta(respuesta)

    reset()

  }

  const { msg } = alerta;

  return (
    <>
      <header className="bg-white shadow rounded-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 ">Editar Perfil</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Informacion Personal
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Puedes cambiar tu informacion personal y agregar una
                      imagen de perfil.
                    </p>
                  </div>
                </div>
                <div className="mt-1 md:mt-0 md:col-span-2">
                  {msg && <Alerta alerta={alerta}/>}
                  <form
                    onSubmit={handleSubmit}
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="mb-1">
                          <label className="block text-sm font-medium mb-1 text-gray-700">
                            Foto de Perfil
                          </label>
                          <div className="mt-1 flex items-center">
                            <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                            <input
                              id="fileSelector"
                              name="img_perfil"
                              type="file"
                              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onChange={handleFileChange}
                              
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="nombre"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Nombre
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              id="nombre"
                              autoComplete="off"
                              value={nombre || ''}
                              required
                              className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                              onChange={(e) => {
                                setPerfil({
                                  ...perfil,
                                  [e.target.name]: e.target.value,
                                })
                              }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={email || ''}
                              onChange={(e) => {
                                setPerfil({
                                  ...perfil,
                                  [e.target.name]: e.target.value,
                                })
                              }}
                              required
                              autoComplete="off"
                              className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="telefono"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Telefono
                            </label>
                            <input
                              type="tel"
                              name="telefono"
                              id="telefono"
                              value={telefono || ''}
                              onChange={(e) => {
                                setPerfil({
                                  ...perfil,
                                  [e.target.name]: e.target.value,
                                })
                              }}
                              autoComplete="off"
                              className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Cambiar Contraseña */}

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Cambiar Contraseña
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Cambia la contraseña de tu cuenta
                    </p>
                  </div>
                </div>
                <div className="mt-1 md:mt-0 md:col-span-2">
                  <form
                    onSubmit={handleSubmitContraseña}
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="contraseña"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Contraseña Actual
                            </label>
                            <input
                              type="password"
                              name="pass"
                              id="pass"
                              autoComplete="off"
                              placeholder='Escribe tu contraseña actual'
                              className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-6 gap-6 mt-4">
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="contraseña"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Nueva Contraseña
                            </label>
                            <input
                              type="password"
                              name="new_pass"
                              id="new_pass"
                              autoComplete="off"
                              placeholder='Nuevo contraseña'
                              className="p-1 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                              onChange={handleInputChange}

                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Guardar Contraseña
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

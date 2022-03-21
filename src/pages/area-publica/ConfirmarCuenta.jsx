import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alerta } from '../../components/Alerta'
import clienteAxios from '../../config/axios'

export const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()

  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
      

        const { data } = await clienteAxios.get(`/veterinarios/confirmar/${id}`)

        setCuentaConfirmada(true)
        setAlerta({ msg: data.msg })
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true })
      }
      setLoading(false)
    }

    confirmarCuenta()
  }, [])

  return (
    <>
      <div className="shadow-2xl lg:shadow-2xl lg:shadow-indigo-900 flex items-center py-8 px-3 sm:px-6 lg:px-8 bg-indigo-600">
        <h3 className="text-slate-50 font-black text-6xl">
          Confirma tu cuenta y empieza a administrar tus{' '}
          <span className="text-black">Pacientes.</span>
        </h3>
      </div>

      {/* INFO */}
      <div className="max-h-full flex justify-content-center items-center col-span-2 md:mx-56 py-12 lg:px-12">
        <div className="max-w-d w-full space-y-8 ">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <div
              className="grid justify-content-center items-center mt-20 md:mt-5 shadow-lg shadow-slate-400
             px-5 py-10 rounded-xl bg-white"
            >
              {!loading && <Alerta alerta={alerta} />}

              {cuentaConfirmada && (
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500 mt-5 mx-auto p-2 rounded-lg border-4"
                >
                  Iniciar Sesion
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

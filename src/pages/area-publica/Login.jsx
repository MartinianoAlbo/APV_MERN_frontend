import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../hooks/useAuth'
import { Alerta } from '../../components/Alerta'
import clienteAxios from '../../config/axios'

export const Login = () => {

  const [formValues, handleInputChange] = useForm({
      email: '', 
      password: ''
  })

  const navigate = useNavigate();

  const {setAuth} = useAuth()

  const [alerta, setAlerta]  = useState({})

  const { msg } = alerta;

  const { email , password } = formValues;


  

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try {
      const {data} = await clienteAxios.post('/veterinarios/login', { email, password })
      localStorage.setItem('token', data.token)

      setAuth(data)
      
      navigate('/admin')
    
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlerta({})    
      }, 5000)
    }

    

  }
  

  return (
    <>
      <div className="shadow-2xl lg:shadow-2xl lg:shadow-indigo-900 flex items-center py-8 px-3 sm:px-6 lg:px-8 bg-indigo-600">
        <h1 className="text-white font-black text-6xl">
          Inicia Sesion y Administra tus{' '}
          <span className="text-black">Pacientes.</span>
        </h1>
      </div>

      {/* Formulario */}
      <div className="max-h-full flex justify-content-center items-center col-span-2 md:mx-56 py-12 px-8  lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </div>
          {
            msg && 
              <Alerta alerta={alerta} />
          }
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="">
              <nav className="text-sm flex justify-between">
                <Link
                  to="/olvide-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Olvidaste tu password?
                </Link>
                <Link
                  to="/registrar"
                  className="font-medium text-slate-900 hover:text-slate-500"
                >
                  Aun no tienes una cuenta?
                </Link>
              </nav>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Inicia Sesion
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Header = () => {
  const { auth, cerrarSesion } = useAuth()
  const [menu, setMenu] = useState(false)
  const [mobile_menu, setMobile] = useState(false)
  const [imgPerfil, setImgPerfil] = useState('')
  const btn_img = useRef()

  useEffect(() => {
    if (auth.img_perfil) {
      setImgPerfil(auth.img_perfil)
    }
  }, [auth.img_perfil])

  return (
    <header>
      <nav className="bg-indigo-900 shadow-2xl animate__animated animate__fadeInDown">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="inline-flex items-center justify-center z-40 p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMobile(!mobile_menu)}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Titulo */}
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <div className="hidden lg:block">
                  <div className="flex">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                    <h1 className="font-bold text-2xl text-indigo-50 text-center ml-2">
                      Administrador de{' '}
                      <span className="text-white">Pacientes</span>
                    </h1>
                  </div>
                </div>

                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
              <div className="ml-3">
                <div>
                  <button
                    type="button"
                    className="bg-indigo-900 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
                    aria-expanded="false"
                    ref={btn_img}
                    aria-haspopup="true"
                    onClick={() => {
                      setMenu(!menu)
                      // setTimeout(() => {
                      //   setMenu(menu)
                      // }, 5000)
                    }}
                  >
                    {imgPerfil ? (
                      <span className="h-8 w-8 inline-block rounded-full overflow-hidden">
                        <img src={`${imgPerfil}`} />
                      </span>
                    ) : (
                      <svg
                        className="h-8 w-8 rounded-full bg-gray-700 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {menu && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate__animated animate__fadeInDown invisible md:visible z-40"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      to={'/admin/perfil'}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Perfil
                    </Link>

                    <hr />

                    <Link
                      to={'/admin'}
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      Pacientes
                    </Link>

                    <hr />

                    <button
                      className="cursor-pointer block px-4 py-2 text-sm text-red-700"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        cerrarSesion()
                      }}
                      id="user-menu-item-2"
                    >
                      Cerrar Sesion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {mobile_menu && (
          <div
            className="sm:hidden animate__animated animate__fadeIn"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

              <Link
                to={'/admin/perfil'}
                className="text-gray-300 hover:bg-indigo-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Perfil
              </Link>

              <Link
                to={'/admin'}
                className="text-gray-300 hover:bg-indigo-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Pacientes
              </Link>

              <button
                onClick={() => {
                  cerrarSesion()
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Cerrar Sesion
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

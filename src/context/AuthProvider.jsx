import { useState, useLayoutEffect, createContext } from 'react'
import clienteAxios from '../config/axios'
import { fileUpload } from '../helpers/fileUpload'


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` ,
        }
      }

      try {
        const { data } = await clienteAxios.get('/veterinarios/perfil', config)
        console.log(data);

        setAuth(data)

      } catch (error) {
        console.log(error.response.data)
        setAuth({})
      }

      setLoading(false)
    }

    autenticarUsuario()
  }, [])

  const actualizarPerfil = async (datos) => {

    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` ,
      }
    }

    try {
      const url = `/veterinarios/perfil/${datos._id}`
      await clienteAxios.put(url, datos, config)
      
      return {
        msg: '✅ Almacenado Correctamente'
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error:true
      }
    }

  }

  const guardarPassword = async (datos) => {
  
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` ,
      }
    }

    try {
      const url = `/veterinarios/actualizar-password`
      const {data} = await clienteAxios.put(url, datos, config)
      
      return {
        msg: data.msg,
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
      
    }

  }

  const subirImagen = async (img) => {
    
    if (img) {
      const resultado = await fileUpload(img)
      return resultado
    }
  
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    setAuth({})
  }


  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        actualizarPerfil,
        guardarPassword,
        subirImagen,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext

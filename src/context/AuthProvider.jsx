import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'
import { fileUpload } from '../helpers/fileUpload'


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        },
      }

      try {
        const { data } = await clienteAxios.get('/veterinarios/perfil', config)
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
      console.log(data);
      
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
    console.log(img);

    const fileUrl = await fileUpload(img)
    console.log(fileUrl);
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

import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'


const RutaProtegida =  () => {

  const { auth, loading } = useAuth()


  if (loading) {
    return 'Loading....'
  }

  return (
    <>
      <Header />

      {auth?._id ? (
        <main className="container mx-auto mt-10 animate__animated animate__fadeIn">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}

      <Footer />
    </>
  )
}

export default RutaProtegida

import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/styles.css'
import 'animate.css';

export const AuthLayout = () => {

  return (
    <>
      <main className='container-fluid h-screen mx-auto md:grid md:grid-cols-3 gap-2 animate__animated animate__fadeIn'>
        <Outlet />
      </main>
    </>
  )
}

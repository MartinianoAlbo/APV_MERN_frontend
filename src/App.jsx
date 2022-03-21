import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import { Registrar } from './pages/area-publica/Registrar'
import { Login } from './pages/area-publica/Login'
import { ConfirmarCuenta } from './pages/area-publica/ConfirmarCuenta'
import { OlvidePassword } from './pages/area-publica/OlvidePassword'
import { NuevoPassword } from './pages/area-publica/NuevoPassword'
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'
import { AdministrarPacientes } from './pages/area-privada/AdministrarPacientes'
import { EditarPerfil } from './pages/area-privada/perfil/EditarPerfil'
import { CambiarPassword } from './pages/area-privada/perfil/CambiarPassword'
import { Perfil } from './pages/area-privada/perfil/Perfil'



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* //AreaPublica */}

            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* Area Privada */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<Perfil />} />
              <Route path='editar-perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />

            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

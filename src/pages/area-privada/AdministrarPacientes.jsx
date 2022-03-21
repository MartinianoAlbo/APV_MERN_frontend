import { useState } from 'react'
import { Formulario } from '../../components/Formulario'
import { ListadoPacientes } from '../../components/ListadoPacientes'

export const AdministrarPacientes = () => {

  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="flex flex-col md:flex-row animate__animated animate__fadeIn">
      <button className="animate__animated animate__bounceIn inline-flex justify-center border shadow-lg shadow-gray-500 text-sm font-medium rounded-full focus:outline-none py-3 px-3 focus:ring-2 w-min mx-auto cursor-pointer md:h-min lg:hidden md:hidden"
      onClick={() => { setShowForm(!showForm) }} 
      >
        {showForm? '🔺' : ' ➕ '}
      </button>
    
      <div className={`${showForm ? 'block' : 'hidden'} mx-auto md:block md:w-1/3 lg:w-1/4 border-r4 animate__animated animate__fadeIn`}>
        <Formulario />
      </div>

      <div className="mx-2 md:w-1/2 lg:w-3/5 mt-8 " >
        <ListadoPacientes />
      </div>
    </div>
  )
}

export const Alerta = ({ alerta }) => {
  
  return (
    <div className={`${alerta.error ? "text-center text-red-600 font-bold text-sm p-1 " : "text-center text-green-600 font-bold text-sm p-1 "} m-3`}>
      {alerta.msg}
    </div>
  )
}

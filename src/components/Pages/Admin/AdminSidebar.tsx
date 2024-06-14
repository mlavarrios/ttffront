import { Link } from "react-router-dom"

function AdminSidebar() {
  return (
    <div className='p-5'>
    <h3 className='text-white p-2 font-bold text-lg'>Administrador</h3>
    <div className='flex flex-col'>
    <Link to="/adminTeachers" className='text-white p-2'>Profesores</Link>
    </div>
  </div>
  )
}

export default AdminSidebar
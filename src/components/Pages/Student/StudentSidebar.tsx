
import { Link} from "react-router-dom"

function StudentSidebar() {

  return (
    <div className='p-5'>
              <h3 className='text-white p-2 font-bold text-lg'>Alumno</h3>
              <div className='flex flex-col'>
              <Link to="/" className='text-white p-2'>Perfil</Link>
              <Link to="/" className='text-white p-2'>Matchmaker</Link>
              <Link to="/" className='text-white p-2'>Matches</Link>
              <Link to="/" className='text-white p-2'>Profesores</Link>
              
              </div>
            </div>
  )
}

export default StudentSidebar
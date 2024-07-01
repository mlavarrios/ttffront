
import { Link} from "react-router-dom"
import useSessionStore from "../../../store/useSessionStore";

function StudentSidebar() {
  const user= useSessionStore.getState().user;

  return (
    <div className='p-5'>
              <h3 className='text-white p-2 font-bold text-lg'>Alumno</h3>
              <div className='flex flex-col'>
              <Link to="/studentProfile" className='text-white p-2'>Mi Perfil</Link>
              {
              user?.userType=="Estudiante Postulante"?
              <>
                <Link to="/studentMatchMaker" className='text-white p-2'>
                Matchmaker
                </Link>
                <Link to="/registerProject/44" className='text-white p-2'>
                Registrar un proyecto
                </Link>
              </>:null
            }
            {
              user?.userType=="Estudiante Postulador"?<Link to="/studentMyProject" className='text-white p-2'>Mi Proyecto</Link>:null
            }
              </div>
            </div>
  )
}

export default StudentSidebar
import { Link } from "react-router-dom"

function TeacherSidebar() {
  return (
    <div className='p-5'>
    <h3 className='text-white p-2 font-bold text-lg'>Profesor</h3>
    <div className='flex flex-col'>
    <Link to="/teacherProfile" className='text-white p-2'>Perfil</Link>
    <Link to="/teacherMatchMaker" className='text-white p-2'>Matchmaker</Link>
    <Link to="/teacherMatches" className='text-white p-2'>Matches</Link>
    </div>
  </div>
  )
}

export default TeacherSidebar
import useSessionStore from '../../../store/useSessionStore';
function StudentHome() {
  const user= useSessionStore.getState().user;
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div className="p-4 sm:ml-64">
          <p className='text-2xl'>Bienvenido {user?.name}</p>
        </div>
      </div>
  )
}

export default StudentHome
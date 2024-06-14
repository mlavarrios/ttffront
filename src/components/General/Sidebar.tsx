import { Button } from 'flowbite-react';
import React, { useEffect } from 'react';
import useSessionStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../Pages/Student/StudentSidebar';
import TeacherSidebar from '../Pages/Teacher/TeacherSidebar';
import AdminSidebar from '../Pages/Admin/AdminSidebar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate= useNavigate();
  const logout  = useSessionStore.getState().logout;
  const user= useSessionStore.getState().user;
  const sidebarClass = isOpen
    ? 'fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0 sm:translate-x-0 bg-guinda'
    : 'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-guinda';

    useEffect(() => {
      // Si el usuario cambia a null, redirige a "/"
      if (!user) {
        navigate("/");
      }
    }, [user, history]);
    const handleLogout = () => {
      // Llama a la función de logout cuando el usuario hace clic en "logout"
      logout();
      // También puedes redirigir inmediatamente después del logout
      navigate("/");
    };
  
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={sidebarClass}
      aria-label="Sidebar"
    >
      <div>
        <div>
          <div>
            <div className="flex items-center justify-center h-60">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2023/06/01/16856207780861.jpg" alt="Foto de perfil" />
              </div>
            </div>
            {
              user?.userType=="student"?<StudentSidebar/>:null
            }
            {
              user?.userType=="teacher"?<TeacherSidebar/>:null
            }
            {
              user?.userType=="admin"?<AdminSidebar/>:null
            }
            <div className='p-5'>
            <Button className='text-white p-2' onClick={handleLogout}>Cerrar Sesión</Button>
            </div>
          </div>
          
        </div>
        { isOpen ? <button  onClick={onClose} className="absolute top-0 right-0 mt-2 mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.707 6.293a1 1 0 0 1 1.414 0L10 8.586l2.879-2.88a1 1 0 1 1 1.414 1.414L11.414 10l2.879 2.879a1 1 0 1 1-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 1 1-1.414-1.414L8.586 10 5.707 7.121a1 1 0 0 1 0-1.414z" />
          </svg>
        </button> : null }
        
      </div>
    </aside>
  );
};

export default Sidebar;

// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../src/components/General/Sidebar';
import Home from './components/Pages/Home/Home'; // Componente para la página principal con sidebar
import AdminHome from './components/Pages/Admin/AdminHome';
import AdminTeachers from './components/Pages/Admin/AdminTeachers/AdminTeachers';
import TeacherHome from './components/Pages/Teacher/TeacherHome';
import TeacherProfile from './components/Pages/Teacher/TeacherProfile';
import TeacherMatchMaker from './components/Pages/Teacher/TeacherMatchMaker';
import TeacherMatches from "./components/Pages/Teacher/TeacherMatches"
import StudentHome from './components/Pages/Student/StudentHome';
import AboutProject from "./components/Pages/CreateProject/AboutProject"
import RegisterProject from "./components/Pages/CreateProject/RegisterProject"
import Forgot from './components/Pages/Forgot/Forgot';
import SidebarToggle from './components/General/SidebarToggle';
import Register from './components/Pages/Register/Register';
import Login from './components/Pages/Login/Login'; // Componente para la página de inicio de sesión con sidebar
import { useState } from 'react';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<WithSidebar><Home /></WithSidebar>} />
      <Route path="/adminHome" element={<WithSidebar><AdminHome /></WithSidebar>} />
      <Route path="/adminTeachers" element={<WithSidebar><AdminTeachers/></WithSidebar>} />
      <Route path="/teacherHome" element={<WithSidebar><TeacherHome /></WithSidebar>} />
      <Route path="/teacherProfile" element={<WithSidebar><TeacherProfile /></WithSidebar>} />
      <Route path="/teacherMatchMaker" element={<WithSidebar><TeacherMatchMaker /></WithSidebar>} />
      <Route path="/teacherMatches" element={<WithSidebar><TeacherMatches /></WithSidebar>} />
      <Route path="/studentHome" element={<WithSidebar><StudentHome /></WithSidebar>} />
        
      <Route path="/" element={<WithoutSidebar><Login /></WithoutSidebar>} />
      <Route path="/register" element={<WithoutSidebar><Register /></WithoutSidebar>} />
      <Route path="/forgot" element={<WithoutSidebar><Forgot/></WithoutSidebar>} />
      <Route path="/aboutProject" element={<WithoutSidebar><AboutProject/></WithoutSidebar>} />
      <Route path="/registerProject" element={<WithoutSidebar><RegisterProject/></WithoutSidebar>} />
      </Routes>
    </Router>
  );
};

const WithSidebar =({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <SidebarToggle onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>
      {children}
    </div>
  );
};

const WithoutSidebar = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default App;
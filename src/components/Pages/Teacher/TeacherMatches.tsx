import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { URI } from '../../../constants/config';
import useSessionStore from '../../../store/useSessionStore';

interface Project {
  id_proyecto: number;
  titulo: string;
}

function TeacherMatches() {
  const user = useSessionStore.getState().user;
  const [projects, setProjects] = useState<Project[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${URI}/profesores/profesor/${user?.userId}/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = (idProject: number) => {
    window.location.href = `/teacher/project/${idProject}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex items-center min-h-screen">
      <div className="flex justify-center items-center w-full py-6">
        <Card href="#" className="w-50 p-10">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Matches
          </h5>
          <div className="w-full flex flex-col gap-5 p-10">
            {projects.map((project) => (
              <Button key={project.id_proyecto} onClick={() => redirect(project.id_proyecto)}>
                <p className='text-black'>* {project.titulo}</p>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TeacherMatches;

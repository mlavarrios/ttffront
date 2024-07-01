import { Button, Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URI } from '../../../constants/config';
import useSessionStore from "../../../store/useSessionStore";

interface Habilidad {
  value: number;
  label: string;
}

interface Miembro {
  id_usuario: number;
  boleta: number;
  nombre: string;
  paterno: string;
  materno: string;
}

interface Proyecto {
  titulo: string;
  descripcion: string;
  alumno: number;
  vacantes: number;
  habilidades: Habilidad[];
  id_proyecto: number;
}

interface Equipo {
  id_equipo: number;
  miembros: Miembro[];
}

interface ProjectData {
  proyecto: Proyecto;
  equipo: Equipo;
  status: string;
}

function StudentMyProject() {
  const user = useSessionStore((state: any) => state.user);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);

  const getProjectData = async () => {
    try {
      const response = await axios.get(`${URI}/proyectos/proyecto_usuario/${user.userId}`);
      setCurrentProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div className="w-full flex items-center min-h-screen">
      <div className="flex justify-center items-center w-full py-6">
        <Card className="w-full max-w-3xl">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Proyecto
          </h5>
          {currentProject ? (
            <>
              <div className="w-full space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="mb-2">
                    <strong>Título:</strong> {currentProject.proyecto.titulo}
                  </p>
                  <p className="mb-2">
                    <strong>Descripción:</strong> {currentProject.proyecto.descripcion}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <strong>Habilidades:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentProject.proyecto.habilidades.map((habilidad) => (
                      <span key={habilidad.value} className="inline-flex items-center bg-blue-200 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {habilidad.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <strong>Miembros:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {currentProject.equipo.miembros.map((miembro) => (
                      <li key={miembro.id_usuario}>
                        {miembro.nombre} {miembro.paterno} {miembro.materno} (Boleta: {miembro.boleta})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p>
                    <strong>Status:</strong> {currentProject.status}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Cargando proyecto...</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default StudentMyProject;

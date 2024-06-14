import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import Axios from "axios";
import TableTeacher from "./TableTeacher";

// Define la interfaz para el tipo de datos del profesor
interface Teacher {
  idProfesor: number;
  materia: string;
  cupo: number;
  usuario: number;
}

const AdminTeachers: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const uri = 'https://ttfinder-d56be5dee4cc.herokuapp.com/profesores'; // Reemplaza con la URI real de tu backend

    const fetchTeachers = async () => {
      try {
        const response = await Axios.get<Teacher[]>(uri);
        console.log('Response from GET request:', response.data);
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Error al cargar los profesores');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex justify-center w-screen h-screen items-center">
        <div className="p-6 sm:ml-64 w-full">
          <div className="p-6 w-full">
            <p className="text-lg">Administrar perfiles de profesores</p>
          </div>
          <div className="w-full">
            <div className="w-full flex p-6 justify-end">
              <Button className="bg-guinda" onClick={() => setOpenModal(true)}>Agregar Profesor</Button>
            </div>
            <div className="overflow-x-auto">
              <TableTeacher teachers={teachers} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl  rounded-lg shadow-lg">
          <Modal.Header>Agregar Profesor</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                companies around the world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setOpenModal(false)}>Agregar</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default AdminTeachers;
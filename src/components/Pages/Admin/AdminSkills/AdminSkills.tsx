// AdminSkills.tsx
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import Axios from "axios";
import TableSkill from "./TableSkill";
import { URI } from "../../../../constants/config";
import { FiPlusCircle } from "react-icons/fi";
import { Skill } from "../../../../types/Skill";

const AdminTeachers: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill| null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchSkills = async () => {
    try {
      const response = await Axios.get<Skill[]>(`${URI}/habilidades`);
      console.log('Response from GET request:', response.data);
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Error al cargar los profesores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (skill:Skill) => {
    setFormData(skill);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete=()=>{
    fetchSkills()
  }

  const handleSave = async () => {
    if (!formData) return;

    try {

      if (isEditing) {
        const response = await Axios.put<Skill>(`${URI}/habilidades/${formData.id_habilidad}`, formData);
        console.log(response.data);
      } else {
        const response = await Axios.post<Skill>(`${URI}/habilidades`, formData);
        console.log(response.data);
      }
      fetchSkills()
    } catch (error) {
      console.error('Error en el guardado.', error);
      setError('Error al guardar la habilidad');
    } finally {
      setOpenModal(false);
      setFormData(null);
      setIsEditing(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-center w-screen h-screen items-center">
        <div className="p-6 sm:ml-64 w-full">
          <div className="p-6 w-full">
            <p className="text-lg">Administrar habilidades (palabras clave)</p>
          </div>
          <div className="w-full">
            <div className="w-full flex p-6 justify-end ">

              <button
                type="button"
                className="text-white bg-guinda hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  setOpenModal(true);
                  setFormData(null);
                  setIsEditing(false);
                }}
              >
                Agregar Habilidad &nbsp;
                <FiPlusCircle size={20}/> 
              </button>
            </div>
            <div className="overflow-x-auto">
              <TableSkill skills={skills} onEdit={handleEdit} update={fetchSkills} handleDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="relative w-full max-w-lg max-h-creen  mx-auto flex items-center justify-center"
      >
        <div className="w-full">
          <Modal.Header>{isEditing ? 'Editar habilidad' : 'Agregar habilidad'}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="px-2 py-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.habilidad || ''}
                    onChange={(e) => setFormData({ ...formData!, habilidad: e.target.value })}
                    placeholder="Nombre"
                    required />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end">
              <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-3 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSave}
              >
                {isEditing ? 'Guardar Cambios' : 'Agregar'}
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTeachers;
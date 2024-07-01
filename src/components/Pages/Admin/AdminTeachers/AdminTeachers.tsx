// AdminTeachers.tsx
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import Axios from "axios";
import TableTeacher from "./TableTeacher";
import { URI } from "../../../../constants/config";
import { Teacher } from '../../../../types/Teacher';
import { FiPlusCircle } from "react-icons/fi";

const AdminTeachers: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Teacher | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const fetchTeachers = async () => {
    try {
      const response = await Axios.get<Teacher[]>(`${URI}/profesores`);
      console.log('Response from GET request:', response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Error al cargar los profesores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher: Teacher) => {
    setFormData(teacher);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFotoFile(file);
  };

  const convertFileToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      let fotoBase64 = '';
      if (fotoFile) {
        const base64Data = await convertFileToBase64(fotoFile);
        if (typeof base64Data === 'string') {
          fotoBase64 = base64Data.split(',')[1];  // Eliminar "data:image/png;base64," u otros encabezados
        }
      }

      const payload = {
        ...formData,
        foto_usuario: fotoBase64,
      };

      if (isEditing) {
        const response = await Axios.put<Teacher>(`${URI}/profesores/${formData.idProfesor}`, payload);
        setTeachers(prev => prev.map(t => t.idProfesor === formData.idProfesor ? response.data : t));
      } else {
        const response = await Axios.post<Teacher>(`${URI}/profesores`, payload);
        setTeachers(prev => [...prev, response.data]);
      }

    } catch (error) {
      console.error('Error saving teacher:', error);
      setError('Error al guardar el profesor');
    } finally {
      setOpenModal(false);
      setFormData(null);
      setIsEditing(false);
      setFotoFile(null);
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
            <p className="text-lg">Administrar perfiles de profesores</p>
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
                Agregar Profesor &nbsp;
                <FiPlusCircle size={20}/> 
              </button>
            </div>
            <div className="overflow-x-auto">
              <TableTeacher teachers={teachers} onEdit={handleEdit} update={fetchTeachers} />
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
          <Modal.Header>{isEditing ? 'Editar Profesor' : 'Agregar Profesor'}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</p>
                <div className="px-2 py-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.nombre_usuario || ''}
                    onChange={(e) => setFormData({ ...formData!, nombre_usuario: e.target.value })}
                    placeholder="Nombre"
                    required />
                </div>
                <div className="px-2 py-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.apellidoPaterno_usuario || ''}
                    onChange={(e) => setFormData({ ...formData!, apellidoPaterno_usuario: e.target.value })}
                    placeholder="Apellido Paterno"
                    required />
                </div>
                <div className="px-2 py-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.apellidoMaterno_usuario || ''}
                    onChange={(e) => setFormData({ ...formData!, apellidoMaterno_usuario: e.target.value })}
                    placeholder="Apellido Materno"
                    required />
                </div>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Otros datos</p>
                <div className="px-2 py-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.materia || ''}
                    onChange={(e) => setFormData({ ...formData!, materia: e.target.value })}
                    placeholder="Materia"
                    required />
                </div>
                <div className="px-2 py-1">
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.cupo || 0}
                    onChange={(e) => setFormData({ ...formData!, cupo: Number(e.target.value) })}
                    placeholder="Cupo"
                    required />
                </div>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Datos de Contacto</p>
                <div className="px-2 py-2">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.correo_usuario || ''}
                    onChange={(e) => setFormData({ ...formData!, correo_usuario: e.target.value })}
                    placeholder="Correo Electronico"
                    required />
                </div>
                <div className="px-2 py-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.celular_usuario || ''}
                    onChange={(e) => setFormData({ ...formData!, celular_usuario: e.target.value })}
                    placeholder="Número de celular"
                    required />
                </div>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto de Usuario</p>
                <div className="px-2 py-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Acceso</p>
                <div className="px-2 py-1">
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData?.contrasenia_usuario || ''}
                    onChange={(e) => setFormData({ ...formData!, contrasenia_usuario: e.target.value })}
                    placeholder="Ingresa una contraseña"
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
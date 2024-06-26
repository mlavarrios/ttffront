// TableTeacher.tsx
import React from 'react';
import { Teacher } from '../../../../types/Teacher';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { URI } from '../../../../constants/config';

interface TableTeacherProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  update: () => void
}

const TableTeacher: React.FC<TableTeacherProps> = ({ teachers, onEdit, update }) => {
  const onDelete = async (teacher: Teacher) => {
    console.log(teacher);
    try {
      const response = await axios.delete(`${URI}/profesores/${teacher.idProfesor}`);
      if (response.status === 200) {
        update();
        alert('Profesor eliminado exitosamente.');
      } else {
        alert('Error al eliminar el profesor.');
      }
    } catch (error) {
      console.error(error);

    }

  }
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white p-6">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope='col' className='px-2 py-3'>Nombre</th>
            <th scope='col' className='px-2 py-3'>Correo Electronico</th>
            <th scope='col' className='px-2 py-3'>Celular</th>
            <th scope="col" className="px-2 py-3">Materia</th>
            <th scope="col" className="px-2 py-3">Cupo</th>
            <th scope="col" className="px-3 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.idProfesor} className="bg-white border-b hover:bg-gray-50">
              <td className="px-2 py-4">
                {teacher.nombre_usuario} {teacher.apellidoPaterno_usuario} {teacher.apellidoMaterno_usuario}
              </td>
              <td className="px-2 py-4">{teacher.correo_usuario}</td>
              <td className="px-2 py-4">{teacher.celular_usuario}</td>
              <td className="px-2 py-4">{teacher.materia}</td>
              <td className="px-2 py-4">{teacher.cupo}</td>
              <td className="px-2 py-4">
                
                <button
                  type="button"
                  className="text-white bg-guinda hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => onEdit(teacher)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  type="button"
                  className="text-white bg-guinda hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => onDelete(teacher)}
                >
                  <MdDelete /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTeacher;
// TableTeacher.tsx
import React from 'react';
import { Skill } from '../../../../types/Skill';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { URI } from '../../../../constants/config';

interface TableSkillProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  update: () => void,
  handleDelete:()=>void
}

const TableSkill: React.FC<TableSkillProps> = ({ skills, onEdit, update }) => {
  const onDelete = async (skill:Skill) => {
    console.log(skill);
    try {
      const response = await axios.delete(`${URI}/habilidades/${skill.id_habilidad}`);
      if (response.status === 200) {
        update();
        alert('Habilidad eliminada exitosamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar.');

    }

  }
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white p-6">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope='col' className='px-2 py-3'>Habilidad</th>
            <th scope="col" className="px-3 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id_habilidad} className="bg-white border-b hover:bg-gray-50">
              <td className="px-2 py-4">
                {skill.habilidad}
              </td>
              <td className="px-2 py-4">
                
                <button
                  type="button"
                  className="text-white bg-guinda hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => onEdit(skill)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  type="button"
                  className="text-white bg-guinda hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => onDelete(skill)}
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

export default TableSkill;
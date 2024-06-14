import React from 'react';

// Define la interfaz para los datos de los profesores
interface Teacher {
  idProfesor: number;
  materia: string;
  cupo: number;
  usuario: number;
}

const TableTeacher: React.FC<{ teachers: Teacher[] }> = ({ teachers }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white p-6">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">ID Profesor</th>
            <th scope="col" className="px-6 py-3">Materia</th>
            <th scope="col" className="px-6 py-3">Cupo</th>
            <th scope="col" className="px-6 py-3">ID Usuario</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.idProfesor} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{teacher.idProfesor}</td>
              <td className="px-6 py-4">{teacher.materia}</td>
              <td className="px-6 py-4">{teacher.cupo}</td>
              <td className="px-6 py-4">{teacher.usuario}</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-cyan-600 hover:underline p-1">Editar</a>
                <a href="#" className="font-medium text-cyan-600 hover:underline p-1">Eliminar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTeacher;
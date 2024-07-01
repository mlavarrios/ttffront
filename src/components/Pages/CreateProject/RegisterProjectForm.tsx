import { useEffect, useState } from 'react';
import MultiSelect from '../../General/Multiselect';
import { useNavigate } from 'react-router-dom';
import { Textarea } from 'flowbite-react';
import { Option } from '../../../types/Option';
import axios from 'axios';
import { URI } from '../../../constants/config';
import useSessionStore from "../../../store/useSessionStore";

interface dato {
  id: number;
}

const RegisterProjectForm = ({ id }: dato) => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const user = useSessionStore((state: any) => state.user);
  const [boleta, setBoleta] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const getSkills = async () => {
    try {
      const response = await axios.get(`${URI}/habilidades`);
      if (response.data) {
        const transformedOptions = response.data.map((item: { habilidad: string; id_habilidad: string }) => ({
          value: item.id_habilidad.toString(),  // Convertir a string
          label: item.habilidad
        }));
        setOptions(transformedOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBoleta = async () => {
    try {
      const response = await axios.get(`${URI}/usuarios/estudiante/${id}`);
      if (response.data) {        
        setBoleta(response.data.boleta);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBoleta();
    getSkills();
    console.log(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const proyectoData = {
        titulo,
        descripcion,
        alumno: boleta,
        habilidades: selectedOptions.map(option => {
          const selectedOption = options.find(opt => opt.value === option);
          return selectedOption ? { value: parseInt(selectedOption.value), label: selectedOption.label } : null;
        }).filter(option => option !== null)
      };
      const response=await axios.post(`${URI}/proyectos`, proyectoData);
      console.log(response.data);
      
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center min-h-screen py-8">
      <div className="block p-8 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 w-full max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <h3 className="text-2xl font-bold text-center">Registrar un nuevo proyecto</h3>
        </div>
        <div className="grid gap-4">
          <div className="space-y-4">
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Titulo del proyecto"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del proyecto"
              required
              rows={4}
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <MultiSelect
              options={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              placeholder="Seleccione una o varias palabra(s) clave(s)"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrar Proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterProjectForm;

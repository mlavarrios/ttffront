import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MultiSelect from '../../General/Multiselect';
import { useNavigate } from 'react-router-dom';
import { Textarea } from 'flowbite-react';

interface FormData {
  username: string;
  email: string;
  photo: File | null;
}

const RegisterProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue('photo', file);  // Set file in the form state
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const nextWindow = () => {
    navigate("/aboutProject");
  };

  return (
    <div className="flex items-center min-h-screen  py-8">
      <div className="block p-8 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 w-full max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <h3 className="text-2xl font-bold text-center">Registrar un nuevo proyecto</h3>
        </div>
        <div className="grid gap-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Titulo del proyecto"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <Textarea  placeholder="Descripción del proyecto" required rows={4} />
            <MultiSelect
              options={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              placeholder="Seleccione una o varia palabras clave"
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextWindow();
          }}
          className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Registrar Proyecto
        </button>
      </div>
    </div>
  );
};

export default RegisterProjectForm;

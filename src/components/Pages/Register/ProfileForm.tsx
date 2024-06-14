import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MultiSelect from '../../General/Multiselect';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  photo: File | null;
}

const ProfileForm: React.FC = () => {
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
          <h3 className="text-2xl font-bold text-center">Formulario de Registro Alumno</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer mb-4"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500">+</span>
              )}
            </div>
            <p className="text-gray-600">Subir foto de perfil (opcional)</p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer mb-4"
              onClick={() => document.getElementById('fileInputCv')?.click()}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500">+</span>
              )}
            </div>
            <p className="text-gray-600">Subir CV (opcional)</p>
            <input
              id="fileInputCv"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <input
              type="text"
              placeholder="Apellido Paterno"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <input
              type="text"
              placeholder="Apellido Materno"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <input
              type="password"
              placeholder="Repetir Contraseña"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <input
              type="text"
              placeholder="Número de Boleta"
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <MultiSelect
              options={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              placeholder="Seleccione una o varias habilidad(es)"
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
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;

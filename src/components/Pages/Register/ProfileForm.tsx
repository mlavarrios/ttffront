import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MultiSelect from '../../General/Multiselect';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URI } from '../../../constants/config';
import { Option } from '../../../types/Option';
import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";

interface FormData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  contrasenia: string;
  celular: string;
  foto: File | null;
  cv: File | null;
  boleta:number
}

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastFailed, setShowToastFailed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFileUpload = async (file: File, setBase64: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      const base64Data = base64String.split(',')[1];
      setBase64(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue('foto', file);
      handleFileUpload(file, setSelectedImage);
    }
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue('cv', file);
      handleFileUpload(file, setSelectedCV);
    }
  };

  const getSkills = async () => {
    try {
      const response = await axios.get(`${URI}/habilidades`);
      if (response.data) {
        const transformedOptions = response.data.map((item: { habilidad: string; id_habilidad: string }) => ({
          value: item.id_habilidad,
          label: item.habilidad
        }));
        setOptions(transformedOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  useEffect(() => {
    // Validar que todos los campos requeridos y las habilidades estén seleccionadas
    setIsFormValid(
      !!selectedImage  && selectedOptions.length > 0 &&
      !errors.nombre && !errors.apellidoPaterno && !errors.apellidoMaterno &&
      !errors.correo && !errors.contrasenia && !errors.celular
    );
  }, [selectedImage, selectedCV, selectedOptions, errors]);

  const onSubmit = async (data: FormData) => {
    if (!isFormValid) {
      return; // No envíes el formulario si no es válido
    }

    try {
      console.warn(selectedOptions);
      const skills = options.filter(obj => selectedOptions.includes(obj.value));
      console.warn(skills);
      
      const formData = {
        nombre: data.nombre,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        correo: data.correo,
        contrasenia: data.contrasenia,
        celular: data.celular,
        rol: 11, // Rol fijo para estudiante
        foto: selectedImage || '',
        cv: selectedCV || '',
        habilidades: skills, // Transforma las opciones seleccionadas a un array de números
        boleta:data.boleta
      };

      const response = await axios.post(`${URI}/usuarios/estudiante`, formData);
      console.log(response.data);

      setShowToastSuccess(true);

      setTimeout(() => {
        setShowToastSuccess(false);
        navigate(`/aboutProject/${response.data.id_usuario}`);
      }, 2800);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setShowToastFailed(true);
    }
  };

  return (
    <>

      <div className="flex items-center justify-center min-h-screen py-8 w-full">
        <div className="block p-8 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      src={`data:image/jpeg;base64,${selectedImage}`}
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
                  {selectedCV ? (
                    <span className="text-gray-500">CV cargado</span>
                  ) : (
                    <span className="text-gray-500">+</span>
                  )}
                </div>
                <p className="text-gray-600">Subir CV (opcional)</p>
                <input
                  id="fileInputCv"
                  type="file"
                  accept="application/pdf"
                  style={{ display: 'none' }}
                  onChange={handleCVUpload}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  {...register('nombre', { required: 'Nombre es requerido' })}
                  className={`block w-full p-3 border rounded-lg bg-gray-50 ${errors.nombre ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                />
                <input
                  type="text"
                  placeholder="Apellido Paterno"
                  {...register('apellidoPaterno', { required: 'Apellido Paterno es requerido' })}
                  className={`block w-full p-3 border rounded-lg bg-gray-50 ${errors.apellidoPaterno ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                />
                <input
                  type="text"
                  placeholder="Apellido Materno"
                  {...register('apellidoMaterno', { required: 'Apellido Materno es requerido' })}
                  className={`block w-full p-3 border rounded-lg bg-gray-50 ${errors.apellidoMaterno ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  {...register('correo', { required: 'Correo es requerido' })}
                  className={`block w-full p-3 border rounded-lg bg-gray-50 ${errors.correo ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                />
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Contraseña"
                  {...register('contrasenia', { required: 'Contraseña es requerida' })}
                  className={`block w-full p-3 border rounded-lg bg-gray-50 ${errors.contrasenia ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                />
                <input
                  type="password"
                  placeholder="Repetir Contraseña"
                  className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Número de Boleta"
                  {...register('boleta', { required: 'Boleta es requerida' })}
                  className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Número de Celular"
                  {...register('celular', { required: 'Celular es requerido' })}
                  className={`block w-full p-3 border rounded-lg bg-gray-50 ${errors.celular ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
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
              type="submit"
              className={`w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={!isFormValid}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className='fixed bottom-2 right-2 mx-2 my-2'>
        {showToastSuccess && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <HiFire className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Registrado exitosamente.</div>
            <Toast.Toggle onDismiss={() => setShowToastSuccess(false)} />
          </Toast>
        )}
        {showToastFailed && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <HiFire className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Ocurrió un error.</div>
            <Toast.Toggle onDismiss={() => setShowToastFailed(false)} />
          </Toast>
        )}
      </div>
    </>
  );
};

export default ProfileForm;

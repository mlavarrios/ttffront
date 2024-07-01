import { Button, Card } from "flowbite-react";
import MultiSelect from "../../General/Multiselect";
import { useEffect, useState } from "react";
import { Option } from "../../../types/Option";
import useSessionStore from "../../../store/useSessionStore";
import axios from "axios";
import { URI } from "../../../constants/config";

interface FormData {
  apellidoMaterno: string;
  apellidoPaterno: string;
  celular: string;
  correo: string;
  cv: string | null;
  foto: string | null;
  habilidades: { value: number, label: string }[];
  id_usuario: number;
  nombre: string;
  rol: number;
  boleta: string;
}

interface HabilidadTransformada {
  id_habilidad: number;
  habilidad: string;
}


function StudentProfile() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const user = useSessionStore((state: any) => state.user);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  // Obtener las habilidades disponibles
  const getSkills = async () => {
    try {
      const response = await axios.get(`${URI}/habilidades`);
      if (response.data) {
        const transformedOptions = response.data.map((item: { habilidad: string; id_habilidad: string }) => ({
          value: item.id_habilidad.toString(),
          label: item.habilidad
        }));
        setOptions(transformedOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener los datos del estudiante
  const getData = async () => {
    if (user) {
      try {
        const response = await axios.get(`${URI}/usuarios/estudiante/${user.userId}`);
        console.log(response.data);
        setFormData(response.data);
        if (response.data.foto) {
          setFotoPreview(`data:image/png;base64,${response.data.foto}`);
        }
        setSelectedOptions(response.data.habilidades.map((hab: { value: number, label: string }) => hab.value.toString()));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getSkills();
    getData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    } as FormData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prevData) => ({
          ...prevData,
          foto: base64String.split(',')[1], // Remove the data URL prefix
        } as FormData));
        setFotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const transformarHabilidades = ()=> {
    return selectedOptions.map(value => {
      const habilidadEncontrada = options.find(habilidad => habilidad.value === value);
      if (habilidadEncontrada) {
        return {
          value: habilidadEncontrada.value,
          label: habilidadEncontrada.label
        };
      }
      throw new Error(`Habilidad con valor ${value} no encontrada`);
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && formData) {
      try {
        const resultado = transformarHabilidades();
        const updatedData = {
          ...formData,
          habilidades: resultado,
        };
        console.log(resultado);
        await axios.put(`${URI}/usuarios/estudiante/${user.userId}`, updatedData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert("Datos actualizados con éxito");
      } catch (error) {
        console.error(error);
        alert("Error al actualizar los datos");
      }
    }
  };

  return (
    <div className="w-full flex items-center min-h-screen">
      <div className="flex justify-center items-center w-full py-6">
        <Card href="#" className="w-50">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Perfil Estudiante
          </h5>
          <div className="p-6">
            {formData && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre Completo"
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <input
                      type="text"
                      name="apellidoPaterno"
                      value={formData.apellidoPaterno}
                      onChange={handleChange}
                      placeholder="Apellido Paterno"
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <input
                      type="text"
                      name="apellidoMaterno"
                      value={formData.apellidoMaterno}
                      onChange={handleChange}
                      placeholder="Apellido Materno"
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="Correo Electrónico"
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <input
                      type="text"
                      name="boleta"
                      value={formData.boleta}
                      onChange={handleChange}
                      placeholder="Boleta"
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="celular"
                      value={formData.celular}
                      onChange={handleChange}
                      placeholder="Número de Teléfono"
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <input
                      type="file"
                      name="foto"
                      onChange={handleFileChange}
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {fotoPreview && (
                      <img
                        src={fotoPreview}
                        alt="Foto de perfil"
                        className="w-32 h-32 rounded-full"
                      />
                    )}
                    <MultiSelect
                      options={options}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      placeholder="Seleccione una o varias habilidad(es)"
                    />
                  </div>
                </div>
                <div className="p-6 w-full flex justify-end">
                  <Button type="submit" className="bg-guinda">Actualizar datos</Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StudentProfile;

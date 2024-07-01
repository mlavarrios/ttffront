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
  habilidades: Option[];
  id_usuario: number;
  nombre: string;
  rol: number;
  boleta: string;
}

function StudentProfile() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const user = useSessionStore((state: any) => state.user);
  const [formData, setFormData] = useState<FormData | null>(null);

  const getData = async () => {
    if (user) {
      try {
        const response = await axios.get(`${URI}/usuarios/estudiante/${user.userId}`);
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    } as FormData));
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
              <form>
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
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData((prevData) => ({
                              ...prevData,
                              foto: reader.result as string,
                            } as FormData));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {formData.foto && (
                      <img
                        src={`data:image/png;base64,${formData.foto}`}
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
                  <Button className="bg-guinda">Actualizar datos</Button>
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

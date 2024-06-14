import { Button, Card } from "flowbite-react"
import MultiSelect from "../../General/Multiselect"
import { useState } from "react";


function TeacherProfile() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = ['Option 1', 'Option 2', 'Option 3'];
    return (
        <div className="w-full flex items-center min-h-screen">
            <div className="flex justify-center items-center w-full py-6">
                <Card href="#" className="w-50">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Perfil
                    </h5>
                    <div className="p-6">
                        <form>
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
                            <div className="p-6 w-full flex justify-end">
                                <Button className="bg-guinda">Actualizar datos</Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TeacherProfile
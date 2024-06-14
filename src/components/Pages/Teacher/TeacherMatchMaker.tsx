import { Button, Card, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import MultiSelect from '../../General/Multiselect';

function TeacherMatchMaker() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = ['Option 1', 'Option 2', 'Option 3'];
    return (
        <div className="w-full flex items-center min-h-screen">
            <div className="flex justify-center items-center w-full py-6">
                <Card href="#" className="w-50">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        MatchMaker
                    </h5>
                    <div className="w-full">
                        <form>
                            <div className="w-full flex flex-row justify-between  ">

                                <div className="w-full flex flex-row justify-between gap-10">
                                    <div className='flex items-center '>
                                        <Button >
                                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.9991 19L9.83911 14C9.56672 13.7429 9.34974 13.433 9.20142 13.0891C9.0531 12.7452 8.97656 12.3745 8.97656 12C8.97656 11.6255 9.0531 11.2548 9.20142 10.9109C9.34974 10.567 9.56672 10.2571 9.83911 10L14.9991 5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Titulo"
                                            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        />
                                        <Textarea placeholder="Descripción del proyecto" required rows={4} />
                                        <MultiSelect
                                            options={options}
                                            selectedOptions={selectedOptions}
                                            setSelectedOptions={setSelectedOptions}
                                            placeholder="Seleccione una o varia palabras clave"
                                        />
                                    </div>
                                    <div className='flex items-center'>
                                        <Button >
                                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </Button>
                                    </div>

                                </div>

                            </div>
                            <div className="p-6 w-full flex justify-end">
                                <Button className="bg-guinda">Confirmar</Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TeacherMatchMaker
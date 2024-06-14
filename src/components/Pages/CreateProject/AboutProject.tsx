import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MultiSelect from '../../General/Multiselect';

interface FormData {
    username: string;
    email: string;
    photo: File | null;
}
function AboutProject() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/");
    }
    const { register, handleSubmit, setValue } = useForm<FormData>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        if (data.photo) {
            formData.append('photo', data.photo);
        }

        // Aquí enviarías formData a tu backend usando fetch o axios
        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
    };

    const registerProject=()=>{
        navigate("/registerProject")
    }
    return (
        <div  >
            <div className="w-full bg-guinda h-12 py-3 flex items-center relative">
                <Button onClick={goBack} className="ml-4 text-white">Back</Button>
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">Sobre el proyecto</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen items-center ">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">


                    <div className="flex items-center min-h-0" >
                        <div className="block  p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div className="flex center p-2">
                                <h3 className="text-center">¿Deseas registrar un proyecto o postularte a uno por otro alumno?</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-5 p-2 justify-center items-center">
                                <div>
                                    <Button className="bg-guinda px-6 py-3.5 text-base font-medium text-white">Unirme a un proyecto</Button>
                                </div>
                                <div>
                                    <Button className="bg-guinda px-6 py-3.5 text-base font-medium text-white" onClick={registerProject}>Crear Proyecto</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AboutProject

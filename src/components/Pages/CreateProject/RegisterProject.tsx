import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import RegisterProjectForm from './RegisterProjectForm';

/*interface FormData {
    username: string;
    email: string;
    photo: File | null;
}*/ 
function RegisterProject() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/aboutProject");
    }
    /*const { register, handleSubmit, setValue } = useForm<FormData>();
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
*/
    /*const onSubmit: SubmitHandler<FormData> = (data) => {
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
    };*/

    /*const registerProject=()=>{
        navigate("/registerProject")
    }*/
    return (
        <div  >
            <div className="w-full bg-guinda h-12 py-3 flex items-center relative">
                <Button onClick={goBack} className="ml-4 text-white">Back</Button>
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">Registro de Proyecto</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen items-center ">
            <RegisterProjectForm/>
            </div>
        </div>
    )
}

export default RegisterProject

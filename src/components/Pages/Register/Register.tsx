
import ProfileForm from './ProfileForm';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Register() {
    
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/");
    }
    return (
        <div  >
            <div className="w-full bg-guinda h-12 py-3 flex items-center relative">
                <Button onClick={goBack} className="ml-4 text-white">Back</Button>
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">Registro</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen items-center ">
                <ProfileForm />
            </div>
        </div>
    )
}

export default Register
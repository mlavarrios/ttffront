import { Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterProjectForm from './RegisterProjectForm';
import { IoMdArrowRoundBack } from "react-icons/io";


function RegisterProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(`/aboutProject/${id}`);
    }
    
    return (
        <div  >
            <div className="w-full bg-guinda h-12 py-3 flex items-center relative">
            <Button onClick={goBack} className="ml-4 text-white">
                <IoMdArrowRoundBack size={25} />
                </Button>
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">Registro de Proyecto</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen items-center ">
            <RegisterProjectForm id={Number(id)}/>
            </div>
        </div>
    )
}

export default RegisterProject

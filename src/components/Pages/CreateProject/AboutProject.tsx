import { Button, Modal } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

function AboutProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const goBack = () => {
        navigate("/");
    }
    const registerProject = () => {
        navigate(`/registerProject/${id}`)
    }
    const joinProject = async() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
        setOpenModal(true)
        setTimeout(() => {
            setOpenModal(false)
            navigate(`/`);
          }, 2000);
    }
    return (
        <div  >
            <div className="w-full bg-guinda h-12 py-3 flex items-center relative">
                <Button onClick={goBack} className="ml-4 text-white">
                    <IoMdArrowRoundBack size={25} />
                </Button>
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">Sobre el proyecto</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen items-center ">
                <div className="flex items-center min-h-0" >
                    <div className="block  p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="flex center p-2">
                            <h3 className="text-center">¿Deseas registrar un proyecto o postularte a uno por otro alumno?</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-5 p-2 justify-center items-center">
                            <div>
                                <Button className="bg-guinda px-6 py-3.5 text-base font-medium text-white" onClick={joinProject}>Unirme a un proyecto</Button>
                            </div>
                            <div>
                                <Button className="bg-guinda px-6 py-3.5 text-base font-medium text-white" onClick={registerProject}>Crear Proyecto</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <Modal 
                show={openModal} 
                size="md" 
                onClose={() => setOpenModal(false)} 
                 className="fixed w-full  min-h-screen flex justify-center items-center"
                popup>
            <div className='fixed  justify-center bg-white top-20'>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Gracias por contestar, serás redirigido al inicio de sesión.
                            </h3>
                        </div>
                    </Modal.Body>
            </div>
                </Modal>
        </div>
    )
}

export default AboutProject


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../../../store/useSessionStore";
import Axios from "axios";
import { Usuario } from '../../../types/Usuario';
import { URI } from "../../../constants/config";
import axios from "axios";


function Login() {
    const navigate = useNavigate();
    const { login } = useSessionStore.getState();
    const [showToast, setShowToast] = useState(false);
    const { user } = useSessionStore.getState();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })



    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    const logIn = async () => {
        try {
            const response = await axios.post(`${URI}/usuarios/verificar`, {
                "correo": formData.email,
                "contrasenia": formData.password
            })
            const exist = response.data;
            console.log(exist);

            if (exist != null) {
                const userData = {
                    userId: exist.id_usuario,
                    email: exist.correo,
                    userType: exist.rol_nombre,
                    name: exist.nombre,
                    photo:exist.foto

                };

                login(userData);
                if (userData?.userType == "Administrador") {
                    navigate("/adminHome")
                } else if (userData?.userType == "Profesor") {
                    navigate("/teacherHome")
                } else {
                    navigate("/studentHome")
                }
            }

        } catch (error) {
            console.error(error);
            handleShowToast()
        }




    }


    return (
        <div  >
            <div className="w-100 bg-guinda h-12 py-3">
                <h2 className="text-white text-center font-bold">Login</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen ">
                <div className="flex items-center" >
                    <div className="block w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">


                        <div className="py-2">
                            <p>Email</p>
                            <input type="text"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Ingresa tu correo electronico" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="py-2">
                            <p>Password</p>
                            <input type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Ingresa tu contraseña" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="py-4 px-8 w-full max-w-xs">
                            <button className="w-full bg-guinda hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logIn}>
                                Login
                            </button>

                        </div>
                        <div className="py-2 flex">
                            <Link to={`/forgot`}> Olvidé mi contraseña</Link>
                        </div>
                        <div className="py-2">

                            <Link to={`/register`}>Registrarme</Link>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div className="fixed bottom-0 right-0 m-8 z-50">
                    <div className="bg-red-500 text-white font-bold rounded-lg shadow-md p-4 max-w-xs">
                        <div>Error</div>
                        <div>Error de inicio.</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
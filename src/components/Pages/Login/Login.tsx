
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../../../store/userStore";
import Axios from "axios";
import { Usuario } from '../../../types/Usuario';


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

    useEffect(() => {
        // Función para obtener la lista de usuarios
        const fetchUsuarios = async () => {
            try {
                const response = await Axios.get('https://ttfinder-d56be5dee4cc.herokuapp.com/usuarios/');
                const data: Usuario[] = await response.data;
                setUsuarios(data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    // Función para verificar el usuario
    const verificarUsuario = () => {
        const emailLower = formData.email.trim().toLowerCase();
        const passwordLower = formData.password.trim().toLowerCase();
        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.correo.toLowerCase() === emailLower && usuario.contrasenia.toLowerCase() === passwordLower
        );

        return usuarioEncontrado || null;
    };

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    const logIn = async () => {

        console.log(usuarios);

        const exist = verificarUsuario()
        console.log(exist);

        if (exist != null) {
            console.log("Existe");
            const userData = {
                email: exist.correo,
                userType: exist.rol_nombre,
                name: exist.nombre,
            };

            login(userData);
            if (userData?.userType == "Administrador") {
                navigate("/adminHome")
            } else if (userData?.userType == "Profesor") {
                navigate("/teacherHome")
            } else if (userData?.userType == "Estudiante Postulante" || userData?.userType == "Estudiante Postulador") {
                navigate("/studentHome")
            } else {
                handleShowToast()
            }

        }



    }
    useEffect(() => {
        if (user?.userType == "admin") {
            //navigate("/adminHome")
        } else if (user?.userType == "teacher") {
            //navigate("/teacherHome")
        } else if (user?.userType == "student") {
            //navigate("/studentHome")
        } else {
            //navigate("/")
        }
    }, [])

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
                        <div>Ingresa el tipo de usuario en el email (desarrollo).</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
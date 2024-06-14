

function Forgot() {
    return (
        <div  >
            <div className="w-100 bg-guinda h-12 py-3">
                <h2 className="text-white text-center font-bold">Restablecimiento de contraseña</h2>
            </div>
            <div className="flex bg-dark flex justify-center min-h-screen ">
                <div className="flex items-center" >
                    <div className="block max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="py-2">
                            <p>Email</p>
                            <input type="text" placeholder="Ingresa tu correo electronico" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="py-2">
                            <p>Password</p>
                            <input type="password" placeholder="Ingresa tu contraseña" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="py-4 px-8 w-full max-w-xs">
                            <button className="w-full bg-guinda hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Enviar
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot
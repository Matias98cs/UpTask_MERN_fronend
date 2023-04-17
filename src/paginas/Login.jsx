import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const navigate = useNavigate()
    const { setAuth } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Completa todos los campos',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post("/usuarios/login", { email, password })
            localStorage.setItem("token", data.token)
            setAuth(data)
            setEmail('')
            setPassword('')
            setAlerta({})
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }


    const { msg } = alerta
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Iniciar sesion y administra tus {' '} <span className="text-slate-700">proyectos</span></h1>

            {msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5 ">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                </div>
                <div className="my-5 ">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                </div>
                <input
                    type="submit"
                    value="Iniciar Sesion"
                    className="w-full bg-sky-700 mb-5 text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="registrar">No tienes una cuenta? Registrate</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="olvide-password">Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Login
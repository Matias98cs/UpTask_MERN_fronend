import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const NuevoPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    const { token } = useParams()
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto agrega minimo 6 caracteres',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
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
            <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu Password y no pierdas acceso a tus {' '} <span className="text-slate-700">proyectos</span></h1>

            {msg && <Alerta alerta={alerta} />}
            {tokenValido && (
                <>
                    <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                        <div className="my-5 ">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                                htmlFor="password"
                            >
                                Nuevo Password
                            </label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Escribre tu Nuevo Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                        </div>
                        <input
                            type="submit"
                            value="Guardar Nuevo Password"
                            className="w-full bg-sky-700 mb-5 text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
                    </form>

                </>
            )}
            {passwordModificado && (
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Inicia Sesion</Link>
            )}

        </>
    )
}

export default NuevoPassword
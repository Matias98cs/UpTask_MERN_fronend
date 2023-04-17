import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioColaborador = () => {

    const [email, setEmail] = useState('')
    const { alerta, mostrarAlerta, submitColaborador } = useProyectos()
    const handleSubmit = e => {
        e.preventDefault()
        if (email === '') {
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }
        submitColaborador(email)
    }

    const { msg } = alerta
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
        >
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label htmlFor="email" className='text-gray-700 uppercase font-bold text-sm'>Email Colaborador</label>
                <input
                    type="email"
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email del Usuario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
            </div>
            <input
                type="submit"
                className='bg-sky-600 text-sms hover:bg-sky-700 w-full text-white p-3 uppercase font-bold cursor-pointer transition-colors rounded'
                value='Buscar Colaborador'
            />
        </form>
    )
}

export default FormularioColaborador
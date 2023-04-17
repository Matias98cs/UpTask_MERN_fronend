import { useEffect, useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
import { useParams } from "react-router-dom"

const FormularioProyecto = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [editId, setEditId] = useState(null)
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    const { id } = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        if (id) {
            setNombre(proyecto.nombre);
            setEditId(proyecto._id)
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [id])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        await submitProyecto({ nombre, descripcion, fechaEntrega, cliente, editId })
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        setEditId(null)
    }

    const { msg } = alerta
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
                <input
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="nombre"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripcion del Proyecto</label>
                <textarea
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="descripcion"
                    placeholder="Descripcion del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha de entrega del Proyecto</label>
                <input
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="fecha-entrega"
                    placeholder="Fecha del proyecto"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre del Cliente</label>
                <input
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="cliente"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input type="submit" value={editId ? 'Actualizar Proyecto' : 'Crear Proyecto'} className="w-full bg-sky-600 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" />
        </form>
    )
}

export default FormularioProyecto
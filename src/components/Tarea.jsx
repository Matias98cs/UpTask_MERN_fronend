import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({ tarea }) => {
    const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea
    const { handleModalEditarTarea, modalEliminarTarea, handleEliminarTarea, completarTarea } = useProyectos()
    const admin = useAdmin()

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl font-bold" >{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase" >{descripcion}</p>
                <p className="mb-1 text-sm font-bold" >{formatearFecha(fechaEntrega)}</p>
                <p className="mb-1  text-gray-600" >Prioridad: {prioridad}</p>
                {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white text-center" >Completada por: {tarea.completado?.nombre}</p>}
            </div>
            <div className="flex gap-2 flex-col lg:flex-row">
                {admin && (
                    <button onClick={() => handleModalEditarTarea(tarea)} className="bg-indigo-600 px-4 py-3 uppercase text-white font-bold text-sm rounded-lg" >Editar</button>
                )}
                <button
                    onClick={() => completarTarea(_id)}
                    className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 uppercase text-white font-bold text-sm rounded-lg`} > {estado ? 'Completa' : 'Incompleta'} </button>
                {admin && (
                    <button onClick={() => handleEliminarTarea(tarea)} className="bg-red-600 px-4 py-3 uppercase text-white font-bold text-sm rounded-lg" >Eliminar</button>
                )}
            </div>
        </div>
    )
}

export default Tarea 
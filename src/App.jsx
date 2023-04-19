import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import React, { lazy, Suspense } from 'react'
import { ProyectosProvider } from './context/ProyectosProvider'
import Loading from './components/Loading'

const AuthLayout = lazy(() => import("./layouts/AuthLayout"))
const Login = lazy(() => import("./paginas/Login"))
const Registrar = lazy(() => import("./paginas/Registrar"))
const OlvidePassword = lazy(() => import("./paginas/OlvidePassword"))
const NuevoPassword = lazy(() => import("./paginas/NuevoPassword"))
const ConfirmarCuenta = lazy(() => import("./paginas/ConfirmarCuenta"))
const RutaProtegida = lazy(() => import("./layouts/RutaProtegida"))
const Proyectos = lazy(() => import("./paginas/Proyectos"))
const NuevoProyecto = lazy(() => import("./paginas/NuevoProyecto"))
const NuevoColaborador = lazy(() => import("./paginas/NuevoColaborador"))
const Proyecto = lazy(() => import("./paginas/Proyecto"))
const EditarProyecto = lazy(() => import("./paginas/EditarProyecto"))


function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <ProyectosProvider>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              </Route>

              <Route path='/proyectos' element={<RutaProtegida />}>
                <Route index element={<Proyectos />} />
                <Route path="crear-proyecto" element={<NuevoProyecto />} />
                <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
                <Route path=":id" element={<Proyecto />} />
                <Route path="editar/:id" element={<EditarProyecto />} />
              </Route>
            </Routes>
          </ProyectosProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router'
import NotFound from './components/NotFound.jsx'
import routes from './router/router.js'
import CreateTask from './pages/CreateTask.jsx'
import Modal from './components/modal.jsx'
import Loading from './pages/LoadingModal.jsx'
import MyTask from './pages/MyTask.jsx'
import ViewTask from './pages/ViewTask.jsx'
import ViewTeam from './pages/ViewTeam.jsx'
import CreateTeam from './pages/CreateTeam.jsx'
import Setting from './pages/Setting.jsx'
function App() {
  return (
    <>
      <Routes>

        {
          routes.map((route) => {
            return (
              <Route element={React.createElement(route.element, null, null)} path={route.path} >

              </Route>
            )
          })

        }
        {/* Loi 404 Not Found */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>

  )
}

export default App

    // <div>
    //   <Setting /> 
    // </div> 
import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router'
import NotFound from './components/NotFound.jsx'
import routes from './router/router.js'
import CreateTask from './pages/CreateTask.jsx'
function App() {
  return (
    <Routes>

        {
          routes.map((route) => {
            return (
              <Route element={React.createElement(route.element , null , null)} path={route.path} >

              </Route>
            )
          })
          
        }
        {/* Loi 404 Not Found */}
        <Route path='*' element={<NotFound />}></Route> 
    </Routes>
    // <div>
    //   <CreateTask /> 

    // </div>
  )
}

export default App

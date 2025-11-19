import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router'
import NotFound from './components/NotFound.jsx'
import routes from './router/router.js'
import Dashboard from './pages/Dashboard.jsx'
function App() {
  return (
    // <Routes>

    //     {
    //       routes.map((route) => {
    //         return (
    //           <Route element={React.createElement(route.element , null , null)} path={route.path} >

    //           </Route>
    //         )
    //       })
          
    //     }
    //     {/* Loi 404 Not Found */}
    //     <Route path='*' element={<NotFound />}></Route> 
      
    // </Routes>
    <Dashboard /> 
  )
}

export default App

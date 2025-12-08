import './App.css'
import React from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom' 
import { Route, Routes } from 'react-router'
import NotFound from './components/NotFound.jsx'
import routes from './router/router.js'
function App() {
  useEffect(() => {
      const mode = localStorage.getItem("theme");
      if (mode === "dark") {
          document
              .querySelector("body")
              .setAttribute("data-app-theme", "dark");
      } 
      else {
          document
              .querySelector("body")
              .setAttribute("data-app-theme", "light");
      }
  }, []);
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
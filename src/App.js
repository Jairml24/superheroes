import React from 'react';
import Heroes from './Heroes';
import HeroesDetalle from './HeroesDetalle';
import './assets/Title.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Heroes />
  },
  {
    path: '/superheroe',
    element:<HeroesDetalle />
  },
])

function App() {
  return (
    <div className='mt-5 px-5 pb-2'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;

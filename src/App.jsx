import Home from './pages/Home'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import User from './pages/User';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/user/:id' element={<User/>} />
      </Routes>
      
      <Toaster 
        toastOptions={{
          // className: 'text-primary bg-primary/5 border border-primary backdrop-blur-md',
          duration: 3000
        }}
      />
    </>
  )
}

export default App

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Principal from './components/Principal';
import LoginCliente from './components/LoginCliente';
import RegistrarCliente from './components/RegistrarCliente';
import '@fontsource/roboto'
import {Container} from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Container>
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/login' element={<LoginCliente />} />
          <Route path='/registro' element={<RegistrarCliente />} />
        </Routes>

      </Container>
      

    </BrowserRouter>
  );
}



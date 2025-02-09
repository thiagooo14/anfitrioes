import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './Pages/Home';
import Saved from './Pages/Saved';
import Detaild from './Pages/Detaild';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salvo" element={<Saved />} />
        <Route path="/acomodacao/:id" element={<Detaild />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes
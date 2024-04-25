import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Adopt from './pages/Adopt';
import Adoptions from './pages/Adoptions';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import { Route, Routes} from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/adopt' element={<Adopt/>} />
         <Route path='/FAQ' element={<FAQ/>} />
         <Route path='/adoptions' element={<Adoptions/>} />
         <Route path='/contact' element={<Contact/>} />
         <Route path='/login' element={<Login/>} />
       </Routes>
    </div>
  );
}

export default App;

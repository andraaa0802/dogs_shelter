import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Adopt from './components/Adopt';
import Adoptions from './components/Adoptions';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Login from './components/Login';
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

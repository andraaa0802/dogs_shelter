import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Authenticator from './Authenticator';

function Header() {
  const [isAuthenticatorOpen, setIsAuthenticatorOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('email');
    const firstName = localStorage.getItem('firstName');
    if (loggedIn === 'true' && email && firstName) {
      setIsLogged(true);
      setUserName(firstName);
  }
  }, []);

  const openAuthenticator = () => setIsAuthenticatorOpen(true);
  const closeAuthenticator = () => setIsAuthenticatorOpen(false);
  
  const handleLogin = (email, userRole, firstName) => {
    setIsLogged(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('firstName', firstName);
    window.dispatchEvent(new Event('storage'));
    window.location.reload();
  }

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');
    localStorage.removeItem('firstName');
    alert("V-ați delogat cu succes!")
    window.dispatchEvent(new Event('storage'));
    window.location.reload();
  }

  return (
    <>
      <div>
        <div className="wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <p className="mb-0 phone pl-md-2 mr-2 text-white">
                  <span className="fa fa-phone mr-1" /> 0745123456
                </p>
                <p className="mb-0 phone pl-md-2 text-white">
                  <span className="fa fa-paper-plane mr-1" /> contact@dogsrescuers.ro
                </p>
              </div>
              <div className="col-md-6 d-flex justify-content-md-end">
                <div className="social-media">
                  <p className="mb-0 d-flex">
                    <a href="https://www.facebook.com" className="d-flex align-items-center justify-content-center"><span className="fa fa-facebook"><i className="sr-only">Facebook</i></span></a>
                    <a href="https://www.twitter.com" className="d-flex align-items-center justify-content-center"><span className="fa fa-twitter"><i className="sr-only">Twitter</i></span></a>
                    <a href="https://www.instagram.com" className="d-flex align-items-center justify-content-center"><span className="fa fa-instagram"><i className="sr-only">Instagram</i></span></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
          <div className="container">
          <Link className="navbar-brand" reloadDocument to="/" ><span className="flaticon-pawprint-1 mr-2" />Dogs Rescuers</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fa fa-bars" /> Meniu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link className="nav-link" reloadDocument to="/">Acasă</Link></li>
                <li className="nav-item"><Link className="nav-link" reloadDocument to="/about">Despre noi</Link></li>
                <li className="nav-item"><Link className="nav-link" reloadDocument to="/adopt">Adoptă</Link></li>
                <li className="nav-item"><Link className="nav-link" reloadDocument to="/FAQ">FAQ</Link></li>
                <li className="nav-item"><Link className="nav-link" reloadDocument to="/adoptions">Adopții</Link></li>
                <li className="nav-item"><Link className="nav-link" reloadDocument to="/contact">Contact</Link></li>
                <li className="nav-item">
                  {isLogged ? (
                  <Link className="nav-link" onClick={handleLogout} > Log out - {userName}</Link>                     
                  ) : (
                  <Link className="nav-link" onClick={openAuthenticator} >Log in</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {isAuthenticatorOpen && <Authenticator closeModal={closeAuthenticator} handleLogin={handleLogin} />}
    </> 
  );
}

export default Header;
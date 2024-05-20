import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">Dogs Rescuers</h2>
              <p>Suntem un adăpost dedicat salvării și îngrijirii câinilor fără stăpân.
                Având drept misiune găsirea unei case iubitoare pentru fiecare patruped, am salvat zeci de vieți și
                am adus bucurie în inimile patrupezilor, dar și în ale familiilor care i-au adoptat.</p>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">Important</h2>
              <div className="block-21 mb-4 d-flex">
                <div className="img mr-4 rounded" style={{ backgroundImage: 'url(images/food.avif)' }} />
                <div className="text">
                  <p>Câinii noștri primesc zilnic mâncare de calitate. </p>

                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <div className="img mr-4 rounded" style={{ backgroundImage: 'url(images/veterinarian.jpeg)' }} />
                <div className="text">
                  <p>Toți câinii sunt deparazitați și vaccinați la zi. </p>

                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0">
              <h2 className="footer-heading">Link-uri utile</h2>
              <ul className="list-unstyled">
                <li><Link className="py-2 d-block" reloadDocument to="/">Acasă</Link></li>
                <li><Link className="py-2 d-block" reloadDocument to="/about">Despre noi</Link></li>
                <li><Link className="py-2 d-block" reloadDocument to="/adopt">Adoptă</Link></li>
                <li><Link className="py-2 d-block" reloadDocument to="/FAQ">FAQ</Link></li>
                <li><Link className="py-2 d-block" reloadDocument to="/adoptions">Adopții</Link></li>
                <li><Link className="py-2 d-block" reloadDocument to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">Unde ne găsiți?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li><span className="icon fa fa-map" /><span className="text">str. Corneliu Baba nr. 19, Oradea, Bihor, România</span></li>
                  <li><span className="icon fa fa-phone" /><span className="text">0745123456</span></li>
                  <li><span className="icon fa fa-paper-plane" /><span className="text">contact@dogsrescuers.ro</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}

export default Footer;

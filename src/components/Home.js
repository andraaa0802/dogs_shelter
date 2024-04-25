import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
      <Header />
      <div className="hero-wrap js-fullheight" style={{ backgroundImage: 'url("images/background1.webp")' }} data-stellar-background-ratio="0.5">
        <div className="overlay" />
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
            <div className="col-md-11 text-center">
              <h1 className="mb-4"> Salvează, adoptă, iubește: împreună putem oferi patrupezilor o a doua șansă la fericire! </h1>
              <p><Link className="btn btn-primary mr-md-4 py-3 px-4" reloadDocument to="/about">Află mai multe <span className="ion-ios-arrow-forward" /></Link></p>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row d-flex no-gutters">
            <div className="col-md-5 d-flex">
              <div className="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0" style={{ backgroundImage: 'url(images/side_about.jpeg)' }}>
              </div>
            </div>
            <div className="col-md-7 pl-md-5 py-md-5">
              <div className="heading-section pt-md-5">
                <h2 className="mb-4">De ce să adopți de la Dogs Rescuers?</h2>
              </div>
              <div className="row">
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-stethoscope" /></div>
                  <div className="text pl-3">
                    <h4>Veterinar propriu</h4>
                    <p>Animăluțele noastre sunt îngrijite corespunzător pe toată perioada șederii lor în adăpost.</p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-customer-service" /></div>
                  <div className="text pl-3">
                    <h4>Servicii asistență</h4>
                    <p>Îți oferim sfaturi prețioase pentru integrarea cât mai ușoară a animăluțului.</p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-emergency-call" /></div>
                  <div className="text pl-3">
                    <h4>Servicii urgență</h4>
                    <p>Punem la dispoziție servicii medicale de urgență asigurate de veterinarul nostru.</p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-veterinarian" /></div>
                  <div className="text pl-3">
                    <h4>Sfaturi utile</h4>
                    <p>Te ajutăm să formezi o legătură cât mai strânsă și frumoasă cu noul tău patruped.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-counter">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 d-flex justify-content-center">
              <div className="block-18 text-center">
                <div className="text">
                  <strong className="number">+250</strong>
                </div>
                <div className="text">
                  <span>Adopții</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex justify-content-center">
              <div className="block-18 text-center">
                <div className="text">
                  <strong className="number">+420</strong>
                </div>
                <div className="text">
                  <span>Câini salvați</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex justify-content-center">
              <div className="block-18 text-center">
                <div className="text">
                  <strong className="number">+10</strong>
                </div>
                <div className="text">
                  <span>Sponsori</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex justify-content-center">
              <div className="block-18 text-center">
                <div className="text">
                  <strong className="number">+300</strong>
                </div>
                <div className="text">
                  <span>Recomandări</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}

export default Home;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUs from '../components/contact_form/contact';
import Breadcrumbs from '../components/Breadcrumbs';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing react-icons

function Contact() {
  return (
    <div>
      <Header />
      <Breadcrumbs path="Contact" />

      <section>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-icon-details">
              <div className="detail-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="detail-content">
                <p>str. Corneliu Baba nr. 19, Oradea</p>
              </div>
              </div>
              <div className="contact-icon-details">
              <div className="detail-icon">
                <FaPhone />
              </div>
              <div className="detail-content">
                <p>0745123456</p>
              </div>
              </div>
              <div className="contact-icon-details">
              <div className="detail-icon">
                <FaEnvelope />
              </div>
              <div className="detail-content">
                <p>contact@dogsrescuers.ro</p>
              </div>
              </div>
          </div>
          <div className="contact-form">
            <ContactUs />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;

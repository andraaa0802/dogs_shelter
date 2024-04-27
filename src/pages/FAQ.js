import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Accordion from '../components/accordion/accordion'
import Breadcrumbs from '../components/Breadcrumbs';

function FAQ() {
  return (

    <div style={{backgroundColor:'#fff'}}>
      <Header />
      <Breadcrumbs previousPage="Acasă" path="FAQ" />
      <div className='container'>
      <Accordion/>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;

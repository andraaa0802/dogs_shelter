import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Accordion from './accordion/accordion'
import Breadcrumbs from './Breadcrumbs';

function FAQ() {
  return (

    <div style={{backgroundColor:'#fff'}}>
      <Header />
      <Breadcrumbs path="FAQ" />
      <div className='container'>
      <Accordion/>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;

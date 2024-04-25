import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

export const ContactUs = () => {
  const form = useRef();
  const[message, setMessage] = useState(null);
  const[phoneError, setPhoneError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    const {from_name, user_email, user_phone, message} = e.target.elements;
    if(!from_name.value || !user_email.value || !user_phone.value || !message.value){
      setMessage('Completați toate câmpurile');
      return;
    }
    else{
      setMessage(null);
    }

    const phonePattern = /^0[0-9]{9}$/;
    if(!phonePattern.test(user_phone.value)){
      setPhoneError('Introduceți un număr de telefon valid');
      return;
    }
    else{
      setPhoneError(null);
    }

    emailjs
      .sendForm('service_u11jdtl', 'template_0fpdyyr', form.current, {
        publicKey: '8bbRQBEDHXObDAA3M',
      })
      .then(
        () => {
          e.target.reset();
          setMessage('Mesajul a fost trimis cu succes!');
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        },
        (error) => {
          setMessage('A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou!');
        },
      );
  };

  return (
    <div className="contact-form-container"> 
    <form ref={form} onSubmit={sendEmail}>
    <h1 className="title">Formular de contact</h1>

      <label>Nume</label>
      <input type="text" name="from_name" placeholder="Ionescu Maria"/>
      <label>Email</label>
      <input type="email" name="user_email" placeholder="maria@gmail.com"/>
      <label>Telefon</label>
      <input type="tel" name="user_phone" placeholder='0749123456'/>
      {phoneError && <p>{phoneError}</p>}
      <label>Mesaj</label>
      <textarea name="message" placeholder="Scrieți ce doriți să ne transmiteți..." />
      {message && <p>{message}</p>}
      <input type="submit" value="Trimite mesaj" />
    </form>

    <img src="images/contact.jpg" alt="contact"/>
    </div>
  );
};
export default ContactUs;
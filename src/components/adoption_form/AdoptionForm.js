import React, { useEffect, useState } from 'react';
import './AdoptionForm.css';
import emailjs from '@emailjs/browser';

function AdoptionForm({ dogId, onClose}) {
    const [formData, setFormData] = useState({
        city: '',
        experience: '',
        anotherDog: '',
        yard: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({ 
            ...formData, 
            [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /*fetch('http://localhost:5500/adopt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                dogId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert("Formularul a fost trimis cu succes!");
            onClose();
        })
        .catch(error => {
            console.error('Error submitting adoption form: ', error);
        });*/

        sendEmail(e);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        
        const email=localStorage.getItem('email');
        const firstname=localStorage.getItem('firstName');
        const phone=localStorage.getItem('phone');
        const {city, experience, anotherDog, yard, message} = formData;

        const templateParams = {
            city,
            experience,
            anotherDog,
            yard,
            message,
            email,
            firstname,
            phone,
            dogId,
        };

        emailjs
        .send('service_o8rw5fm', 'template_4mlwvma', templateParams, '8bbRQBEDHXObDAA3M')    
        .then(
            () => {
                e.target.reset();
                alert('Mesajul a fost trimis cu succes!');
                onClose();
            }, 
            (error) => {
                alert('A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou!');
            }
        );
        console.log(email, firstname, phone, city, experience, anotherDog, yard, message, dogId);
        window.dispatchEvent(new Event('storage'));
    };

    return(
        <div className='adoption-modal'>
            <div className='adoption-modal-content'>
            <span className="close" onClick={onClose}>&times;</span>
            <form onSubmit={ handleSubmit}>
                <h2>Formular de adopție</h2>
                <label>
                    Unde doriți să locuiți cu câinele?
                    <input type='text' name='city' placeholder='Localitatea/orașul' value={formData.city} onChange={handleChange} required />
                </label>
                <label>
                    Aveți experiență cu câinii?
                    <input type='text' name='experience' placeholder='Da/nu' checked={formData.experience} onChange={handleChange} />
                </label>
                <label>
                    Câți câini locuiesc cu dvs.?
                    <input type='text' name='anotherDog' placeholder='0, 1, 2 etc.' value={formData.anotherDog} onChange={handleChange} />
                </label>
                <label>
                    Aveți curte?
                    <input type='text' name='yard' placeholder='Da/nu' checked={formData.yard} onChange={handleChange} />
                </label>
                <label>
                    Doriți să ne lăsați un mesaj?
                    <textarea name='message' placeholder='ex.: De ce vă doriți acest câine? :)' value={formData.message} onChange={handleChange} />
                </label>  
                <p> După trimiterea formularului, unul din colegii noștri vă va contacta pentru a stabili mai multe detalii. Vă mulțumim!</p>  
                <button type='submit'>Trimite</button>
            </form>
            </div>
        </div>
    )
}
export default AdoptionForm;
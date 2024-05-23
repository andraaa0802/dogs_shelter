import React, { useState } from 'react';
import './AdoptionForm.css';

function AdoptionForm({dogId, onClose}) {
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
        fetch('http://localhost:5500/adopt', {
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
        });
    };

    return(
        <div className='adoption-modal'>
            <div className='adoption-modal-content'>
            <span className="close" onClick={onClose}>&times;</span>
            <form onSubmit={handleSubmit}>
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
                    <textarea name='message' placeholder='ex.: De ce vă doriți acest câine? :)' />
                </label>  
                <p> După trimiterea formularului, unul din colegii noștri vă va contacta pentru a stabili mai multe detalii. Vă mulțumim!</p>  
                <button type='submit'>Trimite</button>
            </form>
            </div>
        </div>
    )
}
export default AdoptionForm;
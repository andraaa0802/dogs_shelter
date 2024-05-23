import React, { useState } from 'react';
import './AddDogForm.css';
import axios from 'axios';

function AddDogForm({ onClose, onDogAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        gender: '',
        description: '',
    });

    const [file, setFile] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('breed', formData.breed);
        formDataWithImage.append('age', formData.age);
        formDataWithImage.append('gender', formData.gender);
        formDataWithImage.append('description', formData.description);
        formDataWithImage.append('file', file);

        try{
            const response = await axios.post('http://localhost:5500/addDog', formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status !== 200) {
                throw new Error('Failed to add dog');
            }
            alert('Câine adăugat cu succes!');
            onDogAdded();
            setTimeout(() => { onClose(); }, 1000);
            } catch (error) {
            alert('Failed to add dog');
        
            }
        };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    return (
        <div className='add-dog-modal'>
            <div className='add-dog-modal-content'>
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <h2>Adaugă câine</h2>
                    <label>
                        Nume:
                        <input type='text' name='name' placeholder='Max' value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Rasă:
                        <input type='text' name='breed' placeholder='Akita Inu' value={formData.breed} onChange={handleChange} required />
                    </label>
                    <label>
                        Vârstă:
                        <input type='number' min='0' name='age' placeholder='4' value={formData.age} onChange={handleChange} required />
                    </label>
                    <label>
                        Gen:
                        <input type='text' name='gender' placeholder='M/F' value={formData.gender} onChange={handleChange} required />
                   </label>
                    <label>
                        Descriere:
                        <textarea name='description' placeholder='Câteva cuvinte despre câine' value={formData.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Imagine:
                        <input type='file' onChange={handleImageChange} required />
                    </label>
                    <button type='submit'>Adaugă</button>
                </form>
            </div>
        </div>
    );
}

export default AddDogForm;

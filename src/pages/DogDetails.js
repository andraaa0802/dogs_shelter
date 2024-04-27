import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useParams } from 'react-router-dom';

function DogDetails() {
    const { id } = useParams();
    const [dogDetails, setDogDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5500/dogs/${id}`)
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to fetch dog details: ', response.status);
                    return;
                }
                return response.json();
            })
            .then(data => {
                setDogDetails(data);
            })
            .catch(error => {
                console.error('Error fetching dog details: ', error);
            });
    }, [id]);

    if (!dogDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Breadcrumbs previousPage="Adoptă" path="Detaliile câinelui" />
            <div className='details-container'>
                <p className='info'>Pentru a putea completa formularul de adopție trebuie să fiți logat. </p>
                <div className='details-image-text'>
                    <div>
                        <img className='image-set' src={dogDetails.image_url} alt={dogDetails.name} />
                    </div>
                    <div className='details-text'>
                        <h1>{dogDetails.name}</h1>

                        <p>Vârstă: <span className='dog-details'>{dogDetails.age} ani</span></p>
                        <p>Gen: <span className='dog-details'>{dogDetails.gender}</span></p>
                        <p>Rasă: <span className='dog-details'>{dogDetails.breed}</span></p>
                        <p>Descriere: <span className='dog-details'>{dogDetails.description}</span></p>
                        <button disabled className='adopt-btn'>Adoptă</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DogDetails;

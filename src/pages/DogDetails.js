import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useParams } from 'react-router-dom';
import AdoptionForm from '../components/adoption_form/AdoptionForm';

function DogDetails() {
    const { id } = useParams();
    const [dogDetails, setDogDetails] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [showForm, setShowForm] = useState(false);

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

    useEffect(() => {
        const handleStorageChange = () => {
            const loggedIn = localStorage.getItem('isLoggedIn');
            if (loggedIn) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        handleStorageChange();
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    
    if (!dogDetails) {
        return <div>Loading...</div>;
    }

    const handleAdoptClick = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
        window.history.back();
    }

    return (
        <div>
            <Header />
            <Breadcrumbs previousPage="Adoptă" path="Detaliile câinelui" />
            <div className='details-container'>
                {!isLogged &&
                    <p className='info'>Pentru a putea completa formularul de adopție trebuie să fiți logat. </p>
                }
                <div className='details-image-text'>
                    <div>
                        <img className='image-set' src={dogDetails.image_url} alt={dogDetails.name} />
                    </div>
                    <div className='details-text'>
                        <h1>{dogDetails.name}</h1>

                        <p>Gen: <span className='dog-details'>{dogDetails.gender}</span></p>
                        <p>Vârstă: <span className='dog-details'>{dogDetails.age} ani</span></p>
                        <p>Rasă: <span className='dog-details'>{dogDetails.breed}</span></p>
                        <p>Descriere: <span className='dog-details'>{dogDetails.description}</span></p>
                        <button disabled={!isLogged} onClick={handleAdoptClick} className='adopt-btn'>Adoptă</button>
                    </div>
                </div>
            </div>
            <Footer />
            {showForm && <AdoptionForm dogId={id} onClose={handleCloseForm} />}
        </div>
    );
}

export default DogDetails;
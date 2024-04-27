import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/card/Card';

function Adopt() {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5500/dogs')
      .then(response => {
        if (!response.ok) {
          console.error('Failed to fetch dog data: ', response.status);
          return;
        }
        return response.json();
      })
      .then(data => {
        setDogs(data);
      })
      .catch(error => {
        console.error('Error fetching dog data: ', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Breadcrumbs previousPage="Acasă" path="Adoptă" />
    
      <div className='cards-container'>
      {dogs.map(dog => (
        <div className='cards-display' key={dog.dog_id}>
          <Card
            key={dog.dog_id}
            imgSrc={dog.image_url}
            dogName={dog.name}
            dogAge={dog.age}
            dogGender={dog.gender}
            dogBreed={dog.breed}
            buttonLink={`/dog/${dog.dog_id}`}
          />
          </div>
        ))}
      </div>

      <Footer />
      
    </div>
  );
}

export default Adopt;

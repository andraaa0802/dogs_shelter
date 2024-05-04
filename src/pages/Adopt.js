import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/card/Card';
import Selector from 'react-dropdown-select';

function Adopt() {

  const [dogs, setDogs] = useState([]);
  const [gender, setGender]= useState([]);
  const [breed, setBreed]= useState([]);
  const [age, setAge]= useState([]);
  
  const genderSelectorRef = useRef(null);
  const breedSelectorRef = useRef(null);
  const ageSelectorRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchDogs(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, breed, age]);

  const fetchDogs = () => {
    const url = new URL('http://localhost:5500/dogs');
    if(breed) url.searchParams.append('breed', breed);
    if(gender) url.searchParams.append('gender', gender);
    if(age) url.searchParams.append('age', age);
    if(searchRef.current.value) url.searchParams.append('search', searchRef.current.value);

    fetch(url)
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
  };

  const handleGenderChange = (selected) => {
    setGender(selected[0]?.value || '');
  };

  const handleBreedChange = (selected) => {
    setBreed(selected[0]?.value || '');
  };

  const handleAgeChange = (selected) => {
    setAge(selected[0]?.value || '');
  };

  const resetFilters = () => {
    setGender([]);
    setBreed([]);
    setAge([]);

    genderSelectorRef.current.clearAll();
    breedSelectorRef.current.clearAll();
    ageSelectorRef.current.clearAll();
    searchRef.current.value = '';
  };

  const genderOptions = [
    { label: 'Masculi', value: 'M' },
    { label: 'Femele', value: 'F' },
  ];

  const breedOptions= [
    { label: 'De rasă', value: 'rasa' },
    { label: 'Rasă comună', value: 'comuna' },
  ];

  const ageOptions= [
    { label: 'Crescător', value: 'crescator' },
    { label: 'Descrescător', value: 'descrescator' },
  ];
  
  return (
    <div>
      <Header />
      <Breadcrumbs previousPage="Acasă" path="Adoptă" />
      <div className='search-container'>
        <p className='filter-text'>Căutați ceea ce vă doriți (nume, vârstă, rasă, caracteristică)</p>
      <input type='search' placeholder='Căutați...' className='search-bar' ref={searchRef} onChange={fetchDogs}/>
      </div>
      <div className='filtering'>
        <div className='filter-container'>
        <p className='filter-text'>Filtrați câinii în funcție de gen</p>
        <Selector   ref={genderSelectorRef} options={genderOptions} placeholder='Selectați...' searchable={false} closeOnClickInput={true} onChange={handleGenderChange} className='dropdown-selector'/>
        </div>
        <div className='filter-container'>
        <p className='filter-text'>Filtrați câinii în funcție de rasă</p>
        <Selector   ref={breedSelectorRef} options={breedOptions} placeholder='Selectați...' searchable={false} closeOnClickInput={true} onChange={handleBreedChange} className='dropdown-selector'/>
        </div>
        <div className='filter-container'>
        <p className='filter-text'>Sortați câinii în funcție de vârstă</p>
        <Selector   ref={ageSelectorRef} options={ageOptions} placeholder='Selectați...' searchable={false} closeOnClickInput={true} onChange={handleAgeChange} className='dropdown-selector'/>
        </div>
        <button onClick={resetFilters} className='reset-btn'>Resetați filtrele</button>
      </div>
      <div className='cards-container'>
      {dogs && dogs.map(dog => (
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

import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/card/Card';
import axios from 'axios';

function Adoptions() {
  const [userRole, setUserRole] = useState('');
  const [pendingAdoptions, setPendingAdoptions] = useState([]);
  const [acceptedDogs, setAcceptedDogs] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const role= localStorage.getItem('userRole');
    if (loggedIn === 'true' && role === 'Admin') {
      setUserRole('Admin');
    }
    else {
      setUserRole('User');
    }
    console.log(loggedIn, role);
    window.dispatchEvent(new Event('storage'));

  }, []);
  useEffect(() => {
    axios.get('http://localhost:5500/pendingAdoptions')
    .then (response => {
      setPendingAdoptions(response.data);
    })
    .catch(error => {
      console.error('Error fetching pending adoptions: ', error);
    });

    axios.get('http://localhost:5500/acceptedDogs')
    .then (response => {
      setAcceptedDogs(response.data);
    })
    .catch(error => {
      console.error('Error fetching accepted dogs: ', error);
    });
  }, []);

  const handleApproval = (adoptionId, dogId, action) => {
    console.log(`Adoption ID: ${adoptionId}, Dog ID: ${dogId}, Action: ${action}`);

    axios.post('http://localhost:5500/approveAdoption', {adoptionId, dogId, action})
    .then(response => {
      console.log(response.data);
      if(action==='accept') {
        alert('Adopția a fost aprobată cu succes!');
        window.location.reload();
      }else {
        alert('Adopția a fost respinsă cu succes!');
        setPendingAdoptions(prev => prev.filter(adoption => adoption.dog_id !== dogId));
      }
      })
    .catch(error => {
      alert('A apărut o eroare la aprobarea/respingerea adopției. Vă rugăm să încercați din nou.');
      console.error('Error approving/rejecting adoption: ', error);
    });
  };


  return (
    <div>
      <Header />
      <Breadcrumbs previousPage="Acasă" path="Adopții" />

      {userRole === 'Admin' && (
        <>
        <p style={{ textAlign: 'center' }}>Dacă sunt disponibile adopții, acceptați/respingeți adopțiile câinilor afișați.</p>
        <div className="cards-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {pendingAdoptions && pendingAdoptions.map(adoption => (
            <div className='cards-display' key={adoption.form_id}>
              <Card
                key={adoption.form_id}
                imgSrc={adoption.image_url}
                dogName={adoption.name}
                dogAge={adoption.age}
                dogGender={adoption.gender}
                dogBreed={adoption.breed}
                showAcceptButton={true}
                showRejectButton={true}
                showDetailsButton={false}
                handleApproval={(action) => handleApproval(adoption.form_id, adoption.dog_id, action)}
                />
            </div>
          ))}
        </div>
        </>
      )}
      <p style={{ textAlign: 'center', color:'#34ce57'}}>Aici puteți observa toți câinii care și-au găsit o căsuță iubitoare <span>&hearts;</span></p>
      <div className="cards-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {acceptedDogs && acceptedDogs.map(dog => (
          <div className='cards-display' key={dog.dog_id}>
            <Card
              key={dog.dog_id}
              imgSrc={dog.image_url}
              dogName={dog.name}
              dogAge={dog.age}
              dogGender={dog.gender}
              dogBreed={dog.breed}
              showDetailsButton={false}  
            />
          
          </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Adoptions;

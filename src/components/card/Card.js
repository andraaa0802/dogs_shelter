import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({
    imgSrc,
    dogName,
    dogAge,
    dogGender,
    dogBreed,
    buttonLink
}) {
    return (
        <div className='card-container'>
            <img className='dog-img' src={imgSrc} alt="Available dog" />
            <h1 className='dog-name'>{dogName}</h1>
            <ul>
                <li>Gen: <span className='dog-detail'>{dogGender}</span></li>
                <li>Vârstă: <span className='dog-detail'>{dogAge} ani</span></li>
                <li>Rasă: <span className='dog-detail'>{dogBreed}</span></li>
            </ul>
            <Link to={buttonLink}><button className='card-btn'>Află mai multe</button></Link>
        </div>
    );
}
export default Card;

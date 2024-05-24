import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const Authenticator = ({ closeModal, handleLogin }) => {

    axios.defaults.withCredentials = true;
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        phone: '',
        error: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const[error, setError] = useState('');

    useEffect(() => {
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstname: '',
            lastname: '',
            phone: '',
            error: ''
        });
        setError('');
    }, [isLogin]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const endpoint = isLogin ? 'http://localhost:5500/login' : 'http://localhost:5500/signup';
        const body = isLogin ? { email: formData.email, password: formData.password } : { email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword, firstname: formData.firstname, lastname: formData.lastname, phone: formData.phone };

        axios.post(endpoint, body)
            .then((response) => {
                console.log(response.data);
                if (isLogin) {
                    handleLogin(response.data.email, response.data.userRole, response.data.firstname, response.data.phone);
                    closeModal();
                    setTimeout(() => {
                    alert("Bun venit, " + response.data.firstname + "!");
                    }, 100);
                } else {
                    setIsLogin(true);
                    setTimeout(() => {
                    alert("V-ați înregistrat cu succes! Vă rugăm să vă logați.");
                    }, 100);
                }
            })
            .catch((error) => {
                console.error(error.response);
                if (error.response.status === 404) {
                    setError("Nu există un cont asociat acestui email");
                } else if (error.response.status === 401) {
                    setError("Parola este incorectă");
                } else if (error.response.status === 409) {
                    setError("Acest email este deja înregistrat");
                } else if (error.response.status === 400) {
                    setError("Parolele nu se potrivesc");
                } else if (error.response.status === 406) {
                    setError("Parola trebuie să conțină cel puțin 8 caractere: litere mici și mari, cifre.");
                } else if (error.response.status === 422) {
                    setError("Numărul de telefon este invalid");
                } else {
                    setError("A apărut o eroare. Vă rugăm să încercați din nou.");
                }
            });
    };

    
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{isLogin ? 'Logare' : 'Înregistrare'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input type="text" value={formData.lastname} onChange={handleChange} placeholder="Nume" name="lastname" required />
                            <input type="text" value={formData.firstname} onChange={handleChange} placeholder="Prenume" name="firstname" required />
                            <input type="tel" value={formData.phone} onChange={handleChange} placeholder="Telefon" name="phone" required />
                        </>
                    )}
                    <input type="email" value={formData.email} onChange={handleChange} placeholder="Email" name="email" required/>
                    <div className="password-input">
                        <input type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Parolă" name="password" required />
                        <span onClick={toggleShowPassword} className="password-toggle-icon">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    {!isLogin && (
                        <>
                            <p className='pass-info'>Minim 8 caractere: litere mici și mari, cifre.</p>
                            <div className="password-input">
                            <input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmare parolă" name="confirmPassword" required />
                            <span onClick={toggleShowConfirmPassword} className="password-toggle-icon">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>                       
                        </>
                    )}
                    {error && <p className="error">{error}</p>}
                    <button className='connect-button' type="submit">{isLogin ? 'Log in' : 'Sign Up'}</button>
                </form>
                <p>
                    {isLogin ? (
                        <>
                            Nu ai cont?{' '}
                            <span onClick={() => setIsLogin(false)} className="toggle-link">
                                Înregistrează-te
                            </span>
                        </>
                    ) : (
                        <>
                            Ai cont deja?{' '}
                            <span onClick={() => setIsLogin(true)} className="toggle-link">
                                Loghează-te
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Authenticator;

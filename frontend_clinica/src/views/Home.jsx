import React from 'react';
import Image from 'react-bootstrap/Image';
import stock2 from 'src/assets/stock2.jpg';
import stock3 from 'src/assets/stock3.jpg';
import styles from 'src/views/Home.module.css';
import { useNavigate, Link } from 'react-router-dom';


import { Button } from 'react-bootstrap';

function Home() {
    const navigate = useNavigate();

    const handleAcademy = () => {
        navigate('/courses');
    };
    const handleClinic = () => {
        navigate('/treatments');
    };

    return (
        <div className={styles.mainHome}>

            {/* Multiple classes */}
            <div onClick={handleAcademy} className={`${styles.imageContainer} ${styles.academy}`}>
                
            <Link to="/treatments" className={`${styles.link} fw-bold text-decoration-underline`}>CLINICA</Link>
            </div>

            <div onClick={handleClinic} className={`${styles.imageContainer} ${styles.clinic}`}>

            <Link to="/courses" className={`${styles.link} fw-bold text-decoration-underline`}>ACADEMIA</Link>

            </div>
        </div>
    );
}

export default Home;


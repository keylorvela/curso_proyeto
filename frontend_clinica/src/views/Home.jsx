import React from 'react';
import Image from 'react-bootstrap/Image';
import stock2 from 'src/assets/stock2.jpg';
import stock3 from 'src/assets/stock3.jpg';
import styles from 'src/views/Home.module.css';
import { useNavigate } from 'react-router-dom';


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
        <div className={styles.mainHome} >
            <div className={`${styles.imageContainer} ${styles.academy}`}>
                <Button onClick={handleAcademy} className='mb-5'> ACADEMIA </Button>

            </div>
            <div className={`${styles.imageContainer} ${styles.clinic}`}>
                <Button onClick={handleClinic} className='mb-5'> CLINICA </Button>

            </div>
        </div>
    );
}

export default Home;


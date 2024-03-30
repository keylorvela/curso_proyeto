import React from 'react';
import image from 'src/assets/Vector.svg';
import styles from 'src/views/About.module.css';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

import img from 'src/assets/stock2.jpg'

const About = () => {
    return (
        <>
            <h1 className={styles.aboutTitles} style={{ fontSize: '96px', marginLeft: '4%' }}>Sobre nosotros</h1>
            <Container className='d-flex justify-content-center'>

                <Col sm={6}>
                    <h2 className={styles.aboutTitles}>Nuestra clínica</h2>
                    <p className={styles.aboutDescription}>Más aquí............................................. info</p>
                </Col>
                <Col sm={6}>
                    <Image src={img} className="img-fluid" style={{ marginTop: '20%', marginLeft: '15%' }} />
                </Col>

            </Container>
            <div className={styles.imgDiv}>
                <img
                    className={styles.img}
                    src={image}
                    alt="Imagen"
                />
            </div>
            <Container className='d-flex justify-content-center'>
                <Col sm={6}>
                    <div className={styles.centerText}>
                        <h2 className={styles.aboutTitles} >Misión</h2>

                    </div>
                    <div className={styles.centerText}>
                        <p className={styles.aboutDescription}>Más aquí..................................... info</p>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className={styles.centerText}>
                        <h2 className={styles.aboutTitles} >Visión</h2>
                    </div>
                    <div className={styles.centerText}>
                        <p className={styles.aboutDescription}>Más aquí..................................... info</p>
                    </div>
                </Col>
            </Container>
            <div className={styles.imgDiv}>
                <img
                    className={styles.img}
                    src={image}
                    alt="Imagen"
                />
            </div>
            <Container className='d-flex justify-content-center'>
                <Col sm={6}>
                    <Image src={img} className="img-fluid" style={{ marginTop: '5%', marginBottom: '5%', marginLeft: '-10%' }} />
                </Col>
                <Col sm={6}>
                    <h2 className={styles.aboutTitles} style={{ marginLeft: '15%' }}>Academia</h2>
                    <p className={styles.aboutDescription} style={{ marginLeft: '20%', marginRight: '-15%' }}>Más aquí......................................... info</p>
                </Col>
            </Container>
        </>
    );
};

export default About;

import React from 'react';
import image from 'src/assets/Vector.svg';
import image2 from 'src/assets/Vector(1).svg';
import styles from 'src/views/About.module.css';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';


import MainLayout from 'src/components/MainLayout.jsx';

import img from 'src/assets/stock2.jpg'

function About() {
    return (
        <>

            <MainLayout>

                <div className={styles.main}>

                    <h1 className={styles.aboutTitles} style={{ fontSize: '7vw', marginLeft: '4%' }}>Sobre nosotros</h1>
                    <Container className='d-flex justify-content-center'>

                        <Col sm={6}>
                            <h2 className={styles.aboutTitles}>Nuestra clínica</h2>
                            <p className={styles.aboutDescription}>Más aquí............................................. info</p>
                        </Col>
                        <Col sm={6}>
                            <Image src={img} className="img-fluid" />
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
                            src={image2}
                            alt="Imagen"
                        />
                    </div>
                    <Container className='d-flex justify-content-center'>
                        <Col sm={6}>
                            <Image src={img} className="img-fluid" />
                        </Col>
                        <Col sm={6}>
                            <h2 className={styles.aboutTitles}>Academia</h2>
                            <p className={styles.aboutDescription} >Más aquí......................................... info</p>
                        </Col>
                    </Container>
                </div>

            </MainLayout>
        </>
    );
};

export default About;

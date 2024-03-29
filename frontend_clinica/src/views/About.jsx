import React from 'react';
import image from 'src/assets/Vector.svg';
import styles from 'src/views/About.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import img from 'src/assets/stock2.jpg'

const About = () => {
    return (
        <>
            <h1 className={styles.aboutTitles} style={{ fontSize: '96px' }}>Sobre nosotros</h1>

            <Row>
                <Col sm={6}>
                    <h2 className={styles.aboutTitles}>Nuestra clínica</h2>
                    <p className={styles.aboutDescription}>Más aquí...</p>
                </Col>
                <Col sm={6} style={{ paddingTop: '10%', paddingBottom: '1%' }}>
                    <Image src={img} width={400} height={400} fluid className="mx-auto d-block" />
                </Col>
            </Row>
            <div className={styles.imgDiv}>
                <img
                    className={styles.img}
                    src={image}
                    alt="Imagen"
                />
            </div>
            <Row>
                <Col sm={6}>
                    <div className={styles.centerText}>
                        <h2 className={styles.aboutTitles} >Misión</h2>

                    </div>
                    <div className={styles.centerText}>
                        <p className={styles.aboutDescription}>Más aquí...</p>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className={styles.centerText}>
                        <h2 className={styles.aboutTitles} >Visión</h2>
                    </div>
                    <div className={styles.centerText}>
                        <p className={styles.aboutDescription}>Más aquí...</p>
                    </div>
                </Col>
            </Row>
            <div className={styles.imgDiv}>
                <img
                    className={styles.img}
                    src={image}
                    alt="Imagen"
                />
            </div>
            <Row>
                <Col sm={6} style={{ paddingTop: '10%', paddingBottom: '1%' }}>
                    <Image src={img} width={400} height={400} fluid className="mx-auto d-block" />
                </Col>
                <Col sm={6}>
                    <h2 className={styles.aboutTitles}>Academia</h2>
                    <p className={styles.aboutDescription}>Más aquí...</p>
                </Col>
            </Row>
        </>
    );
};

export default About;

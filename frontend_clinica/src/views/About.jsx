import React from 'react';
import image from 'src/assets/Vector.svg';
import image2 from 'src/assets/Vector(1).svg';
import styles from 'src/views/About.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';


import MainLayout from 'src/components/MainLayout.jsx';

import img from 'src/assets/stock2.jpg'
import Acatemyimg from 'src/assets/stock3.jpg'

function About() {
    return (
        <>

            <MainLayout>

                <div className={styles.main}>


                    <Container className={styles.content}>
                        <Row className='mt-4 mb-3'>
                            <h2 className='fs-1 fw-bold' style={{ color: "var(--main-blue)" }}>Sobre nosotros</h2>
                        </Row>
                        <Row className = 'my-2'>
                            <Col xs={12} md={6}>
                                <Stack>
                                    <h3 className='fw-bold' style={{ color: "var(--main-blue)" }}>Nuestra clínica</h3>
                                    <p>
                                        Desde el 2016, nos hemos insertado al mercado estético buscando 2 objetivos,
                                        tener los mejores profesionales y tratamientos del sector estético, especializandonos
                                        en estética facial, y ser una academia estética que forme verdaderos profesionales en
                                        la rama, a los que consideren parte de la salud, para esto, dar el conocimiento óptimo
                                        y completo para que puedan tratar pacientes de la forma más integralmente posible.
                                    </p>

                                </Stack>
                            </Col>

                            {/*filler*/}
                            <Col md={1}>
                            </Col>
                            <Col xs={12} md={5}>
                                <Image rounded src={img} className="img-fluid" />
                            </Col>
                        </Row>


                    </Container>


                    <div className={styles.svgContainer}>
                        <img src={image} alt="Wave Graphic 1" className={styles.waveGraphic} />
                    </div>


                    <Container className={styles.content}>
                        <Row>
                            <Col md={5} xs={12} >
                                <Stack>
                                    <h3 className='fw-bold text-center' style={{ color: "var(--main-blue)" }}>Misión</h3>
                                    <p>
                                        Desde el 2016, nos hemos insertado al mercado estético buscando 2 objetivos,
                                        tener los mejores profesionales y tratamientos del sector estético, especializandonos
                                        en estética facial, y ser una academia estética que forme verdaderos profesionales en
                                        la rama, a los que consideren parte de la salud, para esto, dar el conocimiento óptimo
                                        y completo para que puedan tratar pacientes de la forma más integralmente posible.
                                    </p>

                                </Stack>
                            </Col>
                            <Col md={2} xs={12} ></Col>
                            <Col md={5} xs={12} >
                                <Stack>
                                    <h3 className='fw-bold text-center' style={{ color: "var(--main-blue)" }}>Visión</h3>
                                    <p>
                                        Desde el 2016, nos hemos insertado al mercado estético buscando 2 objetivos,
                                        tener los mejores profesionales y tratamientos del sector estético, especializandonos
                                        en estética facial, y ser una academia estética que forme verdaderos profesionales en
                                        la rama, a los que consideren parte de la salud, para esto, dar el conocimiento óptimo
                                        y completo para que puedan tratar pacientes de la forma más integralmente posible.
                                    </p>

                                </Stack>
                            </Col>
                        </Row>


                    </Container>

                    <div className={styles.svgContainer}>
                        <img src={image} alt="Wave Graphic 2" className={styles.waveGraphic} style={{ transform: 'rotate(180deg)' }} />
                    </div>


                    <Container className={styles.content}>

                        <Row>

                            <Col xs={12} md={5}>
                                <Image rounded src={Acatemyimg} className="img-fluid" />
                            </Col>
                            {/*filler*/}
                            <Col md={1}>
                            </Col>
                            <Col xs={12} md={6}>
                                <Stack>
                                    <h3 className='fw-bold' style={{ color: "var(--main-blue)" }}>Nuestra Academia</h3>
                                    <p>
                                        Desde el 2016, nos hemos insertado al mercado estético buscando 2 objetivos,
                                        tener los mejores profesionales y tratamientos del sector estético, especializandonos
                                        en estética facial, y ser una academia estética que forme verdaderos profesionales en
                                        la rama, a los que consideren parte de la salud, para esto, dar el conocimiento óptimo
                                        y completo para que puedan tratar pacientes de la forma más integralmente posible.
                                    </p>

                                </Stack>
                            </Col>


                        </Row>


                    </Container>









                </div>

            </MainLayout>
        </>
    );
};

export default About;

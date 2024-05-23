import styles from 'src/components/MainFooter.module.css';
import Logo from 'src/assets/LogoELS.svg';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import { Link } from 'react-router-dom';

function MainFooter() {

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <Container fluid>
                    <Row>
                        {/* Default link */}
                        <Col xs={6} sm={6} md={6} lg={2} className='mb-4'>
                            <Stack gap={3}>
                                <Link className={`${styles.link}`} to="/">Inicio</Link>
                                <Link className={`${styles.link}`} to="/treatments">Tratamientos</Link>
                                <Link className={`${styles.link}`} to="/courses">Cursos</Link>
                                <Link className={`${styles.link}`} to="/about">Quienes Somos</Link>
                            </Stack>
                        </Col>
                        {/* Contacts */}
                        <Col xs={6} sm={6} md={6} lg={3} className='mb-4'>
                            <Stack gap={2}>
                                <p className='fs-5 fw-bold'>Contactos</p>
                                <p className='fs-6'>Clínica: <span className='text-nowrap'>+506 7053-1476</span></p>
                                <p className='fs-6'>Escuela: <span className='text-nowrap'>+506 6128-6160</span></p>
                            </Stack>
                        </Col>
                        {/* Social media */}
                        <Col xs={12} sm={6} md={6} lg={2} className='mb-4'>
                            <Stack gap={3}>
                                <Link className={`${styles.link}`} target='_blank' to={"https://www.instagram.com/clinica_els/"}>
                                    <FaInstagram className={styles.icon}/>
                                    <span> Instagram Clínica</span>
                                </Link>
                                <Link className={`${styles.link}`} target='_blank' to={"http://m.me/ClinicaELS"}>
                                    <FaFacebookMessenger className={styles.icon}/>
                                    <span> Messenger Clínica</span>
                                </Link>
                            </Stack>
                        </Col>
                        {/* Social media */}
                        <Col xs={12} sm={6} md={6} lg={2} className='mb-4'>
                            <Stack gap={3}>
                                <Link className={`${styles.link}`} target='_blank' to={"https://www.instagram.com/els.latam/"}>
                                    <FaInstagram className={styles.icon}/>
                                    <span> Instagram Escuela</span>
                                </Link>
                                <Link className={`${styles.link}`} target='_blank' to={"http://m.me/ELS.LATAM"}>
                                    <FaFacebookMessenger className={styles.icon}/>
                                    <span> Messenger Escuela</span>
                                </Link>
                            </Stack>
                        </Col>
                        {/* Divider */}
                        <Col xs={12} lg={1}>
                            <div className={`vr ${styles.line}`}></div>
                        </Col>
                        {/* Location */}
                        <Col xs={6} sm={6} md={6} lg={1} className='mb-4'>
                            <Stack gap={3}>
                                <Link className={`${styles.link}`} target='_blank' to="https://maps.app.goo.gl/EEDh6dgZjnG1yqgz5">Ubicación</Link>
                            </Stack>
                        </Col>
                        {/* Home logo */}
                        <Col xs={6} sm={6} md={6} lg={1} className='mb-4'>
                            <div className={styles.logoDiv}>
                                <Link to="/"><img className={styles.logoImg} src={Logo} alt="Clínica ELS Logo" /></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    );
}

export default MainFooter;
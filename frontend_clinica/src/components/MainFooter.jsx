
import styles from 'src/components/MainFooter.module.css';
import Logo from 'src/assets/LogoELS.svg';


import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import { Link } from 'react-router-dom';

function MainFooter() {

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <Container>
                    <Row>
                        <Col>

                            <Stack gap={3}>
                                <Link className={`${styles.link}`} to="/">Inicio</Link>
                                <Link className={`${styles.link}`} to="/treatments">Tratamientos</Link>
                                <Link className={`${styles.link}`} to="/courses">Cursos</Link>
                                <Link className={`${styles.link}`} to="/about">Quienes Somos</Link>
                            </Stack>

                        </Col>
                        <Col>

                            <Stack gap={2}>
                                <p className='fs-5 fw-bold'>Contactos</p>
                                <p className='fs-6'>nombre@dominio.com</p>
                                <p className='fs-6'>+506 8123-1234</p>

                            </Stack>

                        </Col>
                        <Col>

                            <Stack direction="horizontal" gap={3}>
                                <FaFacebook className={styles.icon} />
                                <FaInstagram className={styles.icon} />
                            </Stack>

                        </Col>
                        <Col>
                            <div className={`vr ${styles.line}`}></div>
                        </Col>
                        <Col>

                            <Stack gap={3}>
                                <Link className={`${styles.link}`} to="/">Ubicación</Link>
                            </Stack>

                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.logo}>
                <div className={styles.logoDiv}>
                    <Link to="/"><img className={styles.logoImg} src={Logo} alt="Clínica ELS Logo" /></Link>
                </div>

            </div>



        </div >
    );
}

export default MainFooter;
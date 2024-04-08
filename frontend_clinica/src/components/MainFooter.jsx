
import styles from 'src/components/MainFooter.module.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { Link } from 'react-router-dom';

function MainFooter() {

    return (
        <div className={styles.main}>
            <Container className="mx-0">
                <Row>
                    <Col>

                        <Stack gap={3}>
                            <Link className={`${styles.link}`} to="/">Inicio</Link>
                            <Link className={`${styles.link}`} to="/">Inicio</Link>
                            <Link className={`${styles.link}`} to="/">Inicio</Link>
                        </Stack>

                    </Col>
                    <Col>

                        <Stack gap={3}>
                            <Link className={`${styles.link}`} to="/">Contactos</Link>
                            <Link className={`${styles.link}`} to="/">Inicio</Link>
                            <Link className={`${styles.link}`} to="/">Inicio</Link>
                        </Stack>

                    </Col>
                    <Col>

                        <Stack gap={3}>
                            <Link className={`${styles.link}`} to="/">Logos</Link>
                        </Stack>

                    </Col>
                    <Col>
                    <div className="vr"></div>
                    </Col>
                    <Col>

                        <Stack gap={3}>
                            <Link className={`${styles.link}`} to="/">Ubicación</Link>
                        </Stack>

                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default MainFooter;
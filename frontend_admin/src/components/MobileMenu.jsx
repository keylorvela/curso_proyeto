import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import Logo from 'src/assets/LogoELS.svg';
import styles from 'src/components/MobileMenu.module.css'

function MobileMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-light" onClick={handleShow}>
            ☰
            </Button>

            <Alert variant="info" className="d-none d-lg-block">
                Resize your browser to show the responsive offcanvas toggle.
            </Alert>

            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                
                
                <Offcanvas.Header className = {styles.header} closeButton>
                    <Link onClick = {handleClose} to="/"><img className={styles.logoImg} src={Logo} alt="Clínica ELS Logo" /></Link>
                </Offcanvas.Header>


                <Offcanvas.Body>
                    <ListGroup>
                        {/*<ListGroup.Item>
                            <Link onClick = {handleClose} to="/students">Ver lista de estudiantes</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link onClick = {handleClose} to="/courses">Cursos</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link onClick = {handleClose} to="/profesors">Profesores</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link onClick = {handleClose} to="/applications">Solicitudes</Link>
                        </ListGroup.Item>*/}
                        <ListGroup.Item>
                            <Link onClick = {handleClose} to="/treatments">Tratamientos</Link>
                        </ListGroup.Item>

                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MobileMenu;
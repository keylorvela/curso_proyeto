import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import Logo from 'src/assets/LogoELS1.svg';
import styles from 'src/components/MobileMenu.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import YesNoModal from 'src/components/utils/YesNoModal.jsx';

import useAuth from 'src/components/utils/AuthContext.jsx';

function MobileMenu({ links }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAlert, setShowAlert] = useState(false);

    const { logout } = useAuth();

    const close = () => {
        logout();
    }


    return (
        <>
            <YesNoModal
                question=""
                message={<strong className="fs-3 my-2"> ¿Está seguro que desea salir? </strong>}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                handleYes={close}
            />


            <Button variant="outline-light" onClick={handleShow}>
                ☰
            </Button>

            <Alert variant="info" className="d-none d-lg-block">
                Resize your browser to show the responsive offcanvas toggle.
            </Alert>

            <Offcanvas show={show} onHide={handleClose} responsive="lg">


                <Offcanvas.Header className={styles.header} closeButton>
                    <Link onClick={handleClose} to="/"><img className={styles.logoImg} src={Logo} alt="Clínica ELS Logo" /></Link>
                </Offcanvas.Header>


                <Offcanvas.Body>

                    <ListGroup className="mb-5">
                        {links.map((link, index) => (
                            <ListGroup.Item key={index}>
                                <Link key={index} to={link.to}>
                                    {link.label}
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <div className={styles.close} >

                        <b onClick={() => setShowAlert(true)} className='fs-3'>
                            <FontAwesomeIcon icon={faRightFromBracket} className="fa-1x me-1" /> Cerrar sesión
                        </b>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MobileMenu;
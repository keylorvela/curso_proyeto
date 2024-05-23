import React from 'react';
import MainNavbar from 'src/components/MainNavbar.jsx';
import MainFooter from 'src/components/MainFooter.jsx';
import BaseModal from './utils/BaseModal';
import styles from 'src/components/MainLayout.module.css';

import { FaWhatsapp } from 'react-icons/fa';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useState } from 'react';

import Stack from 'react-bootstrap/Stack';

function MainLayout({ children }) {

    const [showAlert, setShowAlert] = useState(false);

    const getBg = () => {
        const numeroAleatorio = Math.floor(Math.random() * 5) + 1; // Genera un número aleatorio del 1 al 10
        return `blob${numeroAleatorio}.svg`;
    }

    const makeWhatsappBadge = (link, message) => {
        return (
            <div className={`d-flex align-items-center ${styles.contactBadge}`}>
                <FaWhatsapp size={50} color='#25D366'></FaWhatsapp>
                <a href={link} target="_blank" className={`fs-5 px-2 ${styles.whatsapp_link}`} style={{color: "#25D366"}} >{message}</a>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <nav className={styles.navbar}>
                    <MainNavbar />
                </nav>

                <main className={styles.main}>
                    {children}

                    <BaseModal
                        pshow={showAlert}
                        setShow={setShowAlert}
                    >
                        <span className='d-block fs-2 mb-3' style={{ color: "var(--main-blue)" }}>Contáctanos por Whatsapp</span>
                        <Stack gap={4}>
                            { makeWhatsappBadge("https://wa.me/50670531476", "Enviar mensaje a la clínica") }
                            { makeWhatsappBadge("https://wa.me/message/RHV4XVABBVRFC1", "Enviar mensaje a la escuela") }
                        </Stack>
                    </BaseModal>

                    {/* Botón whatsapp */}
                    <div className={styles.floatingButton}>
                        <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip><span className='fs-5 px-2'>Contáctanos por Whatsapp</span></Tooltip>}
                        >
                            <div>
                                {/* window.open('https://www.google.com', '_blank'); */}
                                <FaWhatsapp size={95} onClick={() => { setShowAlert(true) }} />
                            </div>
                        </OverlayTrigger>
                    </div>
                </main>
            </div>

            <MainFooter />
            <div className={styles.backgroundImage} style={{ backgroundImage: `url(src/assets/${getBg()})` }} ></div> {/* Aquí se coloca la imagen de fondo */}

        </div>
    );
}

export default MainLayout;

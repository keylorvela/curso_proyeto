import React from 'react';
import MainNavbar from 'src/components/MainNavbar.jsx';
import MainFooter from 'src/components/MainFooter.jsx';
import AlertModal from 'src/components/utils/AlertModal.jsx';
import styles from 'src/components/MainLayout.module.css';
import { PiWhatsappLogoBold } from 'react-icons/pi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useState } from 'react';
function MainLayout({ children }) {
  
  const [showAlert, setShowAlert] = useState(false);

  const getBg = () => {
    const numeroAleatorio = Math.floor(Math.random() * 5) + 1; // Genera un número aleatorio del 1 al 10
    return `blob${numeroAleatorio}.svg`;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.navbar}>
          <MainNavbar />
        </nav>

        <main className={styles.main}>
          
          
          
          {children}

          
          <AlertModal
                  title="Atención"
                  message="Whatsapp."
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
          />

          {/* Botón whatsapp */}
          <div className={styles.floatingButton}>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip><p className='fs-3 px-2'>Ir a whatsapp</p></Tooltip>}
            >
              <div>
                <PiWhatsappLogoBold size={100} onClick={() => { setShowAlert(true) }} />
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

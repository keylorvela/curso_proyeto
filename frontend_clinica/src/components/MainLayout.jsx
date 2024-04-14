import React from 'react';
import MainNavbar from 'src/components/MainNavbar.jsx';
import MainFooter from 'src/components/MainFooter.jsx';
import styles from 'src/components/MainLayout.module.css';
import { PiWhatsappLogoBold } from 'react-icons/pi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.navbar}>
          <MainNavbar />
        </nav>

        <main className={styles.main}>
          
          
          
          {children}


          {/* Botón whatsapp */}
          <div className={styles.floatingButton}>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip><p className='fs-3 px-2'>Ir a whatsapp</p></Tooltip>}
            >
              <div>
                <PiWhatsappLogoBold size={100} onClick={() => { alert("Whatsapp") }} />
              </div>
            </OverlayTrigger>
          </div>
        </main>
      </div>

      
      <MainFooter />
      <div className={styles.backgroundImage}></div> {/* Aquí se coloca la imagen de fondo */}

    </div>
  );
}

export default MainLayout;

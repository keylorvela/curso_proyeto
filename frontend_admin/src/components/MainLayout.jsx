import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import MainNavbar from 'src/components/MainNavbar.jsx';
import YesNoModal from 'src/components/utils/YesNoModal.jsx';
import styles from 'src/components/MainLayout.module.css';

import useAuth from 'src/components/utils/AuthContext.jsx';

function getLinks(type) {
  /*
  1 - Admin
  2 - Professor
  3 - Student
  */

  let links;
  switch (type) {
    case 1:
      links = [
        { to: '/admin/students', label: 'Lista estudiantes' },
        { to: '/admin/courses', label: 'Cursos' },
        { to: '/admin/professors', label: 'Profesores' },
        { to: '/admin/applications', label: 'Solicitudes' },
        { to: '/admin/treatments', label: 'Tratamientos' },
      ];
      break;
    case 2:
      links = [
        { to: '/professor/courses', label: 'Mis Cursos' },
        { to: '/professor/profile', label: 'Mi Perfil' }
      ];
      break;
    case 3:
      links = [
        { to: '/student/courses', label: 'Mis Cursos' },
        { to: '/student/profile', label: 'Mi Perfil' }
      ];
      break;
    default:
      links = [];
  }
  return links;
}

function MainLayout({ children, type }) {
  /*
    Type se refiere al tipo de interfaz, admin, student, professor
  */
  const [showAlert, setShowAlert] = useState(false);

  const { logout } = useAuth();

  const close = () => {
    logout();
  }

  let links = getLinks(type);

  return (
    <>
    <YesNoModal
        question=""
        message={ <strong className = "fs-3 my-2"> ¿Está seguro que desea salir? </strong>}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        handleYes={close}
      />
      
    <div className={styles.container}>
      
      <div className={styles.content}>
        <nav className={styles.navbar}>
          <MainNavbar links={links} />
        </nav>

        <main className={styles.main}>
          {children}
          

          {/* Boton flotante */}
          <div className={styles.button} onClick={() => setShowAlert(true)}>
            <FontAwesomeIcon icon={faRightFromBracket} className="fa-4x"/>
            <span> <b className='fs-3 ms-3'>Cerrar Sesión</b></span>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default MainLayout;

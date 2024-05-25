
import MainNavbar from 'src/components/MainNavbar.jsx';
import styles from 'src/components/MainLayout.module.css';


import { Link } from 'react-router-dom';



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
        { to: '/professor/students', label: 'Estudiantes' },
        { to: '/professor/courses', label: 'Mis Cursos' },
        { to: '/professor/profile', label: 'Mi Perfil' },
        { to: '/professor/news', label: 'Noticias' }
      ];
      break;
    case 3:
      links = [
        { to: '/student/courses', label: 'Mis Cursos' },
        { to: '/student/profile', label: 'Mi Perfil' },
        { to: '/student/profile', label: 'Noticias' }
      ];
      break;

    default:
      links = {};
  }
  return links;
}




function MainLayout({ children, type }) {
  /*
    Type se refiere al tipo de interfaz, admin, student, professor
  */

  let links = getLinks(type);



  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.navbar}>
          <MainNavbar links={links} />
        </nav>

        <main className={styles.main}>



          {children}





        </main>
      </div>


    </div>
  );
}

export default MainLayout;

import MobileMenu from 'src/components/MobileMenu.jsx';

import styles from 'src/components/MainNavbar.module.css'
import Logo from 'src/assets/LogoELS.svg';
import { Link, Outlet } from 'react-router-dom';


function MainNavbar() {

    return (

        <>
            
            <div className={styles.navbar}>

                <div class={styles.logoDiv}>
                <Link to="/"><img className={styles.logoImg} src={Logo} alt="Clínica ELS Logo" /></Link>
                </div>

                {/* Options */}
                <div className={styles.mobileMenu}><MobileMenu/></div>
                <div class={styles.content}>

                            <Link to="/about" className={styles.navLink}>Quienes Somos</Link>

                            <Link to="/treatments" className={styles.navLink}>Tratamientos</Link>
                        
                            <Link to="/courses" className={styles.navLink}>Cursos</Link>
   
                </div>
            </div>

        </>

    );

}


export default MainNavbar;
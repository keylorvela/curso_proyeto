import MobileMenu from 'src/components/MobileMenu.jsx';
import styles from 'src/components/MainNavbar.module.css';
import Logo from 'src/assets/LogoELS1.svg';
import { Link } from 'react-router-dom';

function MainNavbar({ links }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoDiv}>
        <Link to="/">
          <img className={styles.logoImg} src={Logo} alt="Clínica ELS Logo" />
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className={styles.mobileMenu}>
        <MobileMenu links={links} />
      </div>

      {/* Navigation Links */}
      <div className={styles.content}>
        {links.map((link, index) => (
          <Link key={index} to={link.to} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainNavbar;

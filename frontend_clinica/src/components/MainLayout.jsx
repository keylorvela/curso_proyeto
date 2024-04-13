import React from 'react';
import MainNavbar from 'src/components/MainNavbar.jsx';
import MainFooter from 'src/components/MainFooter.jsx';
import styles from 'src/components/MainLayout.module.css';

function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.navbar}>
          <MainNavbar />
        </nav>
        <main className={styles.main}>{children}</main>
      </div>
      <MainFooter />
    </div>
  );
}

export default MainLayout;

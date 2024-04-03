import React from 'react';
import MainNavbar from 'src/components/MainNavbar';
import styles from 'src/components/MainLayout.module.css';

function MainLayout({ children }) {
  return (
    <>
      <div className={styles.page}>

        <nav className={styles.navbar}>
          <MainNavbar />
        </nav>

        <main className={styles.main}>
          {children}
        </main>

        <footer className={styles.footer}>

        </footer>

      </div>
    </>
  );
}

export default MainLayout;

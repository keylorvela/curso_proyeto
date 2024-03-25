import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from './App.module.css';
import Home from 'src/views/Home.jsx';
import About from 'src/views/About.jsx';
import Courses from 'src/views/Courses.jsx';
import Treatments from 'src/views/Treatments.jsx';
import NoPage from 'src/views/NoPage.jsx';
import MainNavbar from 'src/components/MainNavbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.page}>
        <nav className={styles.head}>
          <MainNavbar/>
        </nav>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="courses" element={<Courses />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

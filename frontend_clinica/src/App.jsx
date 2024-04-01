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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="courses" element={<Courses />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
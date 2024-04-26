import { BrowserRouter, Routes, Route } from "react-router-dom";
import Treatments from 'src/views/Treatments.jsx';
import ModifyTreatment from 'src/views/ModifyTreatment.jsx';
import Professors from 'src/views/Professors.jsx';
import Applications from 'src/views/Applications.jsx';
import Students from 'src/views/Students.jsx';
import Courses from 'src/views/Courses.jsx';
import ModifyTest from 'src/views/ModifyTest.jsx';
import Login from 'src/views/Login.jsx';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Students />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="modifyTreatment/:id" element={<ModifyTreatment />} />
            <Route path="professors" element={<Professors />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
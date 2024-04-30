import { BrowserRouter, Routes, Route } from "react-router-dom";
import Treatments from 'src/views/Treatments.jsx';
import ModifyTreatment from 'src/views/ModifyTreatment.jsx';
import Professors from 'src/views/Professors.jsx';
import Applications from 'src/views/Applications.jsx';


import ManageTreatment from 'src/views/ManageTreatment.jsx';
import ManageCourse from 'src/views/ManageCourse.jsx';
import ManageProfessor from 'src/views/ManageProfessor.jsx';
import Students from 'src/views/Students.jsx';
import StudentsByProf from 'src/views/StudentsByProf.jsx';
import MyCourses from 'src/views/MyCourses.jsx';
import Courses from 'src/views/Courses.jsx';
import ModifyTest from 'src/views/ModifyTest.jsx';
import Login from 'src/views/Login.jsx';

import Test from 'src/views/Test.jsx';
function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentsByProf />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="modifyTreatment/:id" element={<ModifyTreatment />} />
            <Route path="course/:id" element={<ManageCourse />} />
            <Route path="course" element={<ManageCourse />} />
            <Route path="professors" element={<Professors />} />
            <Route path="professor/:id" element={<ManageProfessor />} />
            <Route path="professor" element={<ManageProfessor />} />
            <Route path="treatment/:id" element={<ManageTreatment />} />
            <Route path="treatment" element={<ManageTreatment />} />

            <Route path="test" element={<Test totalPoints = {15} />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Treatments from 'src/views/Treatments.jsx';
import ModifyTreatment from 'src/views/ModifyTreatment.jsx';
import Professors from 'src/views/Professors.jsx';
import Applications from 'src/views/Applications.jsx';


import ManageTreatment from 'src/views/admin/ManageTreatment.jsx';
import ManageCourse from 'src/views/admin/ManageCourse.jsx';
import ManageProfessor from 'src/views/admin/ManageProfessor.jsx';
import Students from 'src/views/Students.jsx';
import StudentsByProf from 'src/views/StudentsByProf.jsx';
import MyCourses from 'src/views/MyCourses.jsx';
import Courses from 'src/views/Courses.jsx';
import ModifyTest from 'src/views/ModifyTest.jsx';
import Login from 'src/views/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsByProf />} />
        <Route path="treatments" element={<Treatments />} />
        <Route path="modifyTreatment/:id" element={<ModifyTreatment />} />
        <Route path="professors" element={<Professors />} />
        <Route path="admin/course/:id" element={<ManageCourse />} />
        <Route path="admin/course" element={<ManageCourse />} />
        <Route path="admin/professor/:id" element={<ManageProfessor />} />
        <Route path="admin/professor" element={<ManageProfessor />} />
        <Route path="admin/treatment/:id" element={<ManageTreatment />} />
        <Route path="admin/treatment" element={<ManageTreatment />} />


        <Route path="/*" element={
          <div className='mx-5 my-5 px-5 py-5 d-flex justify-content-center align-items-center'>
            <h1>404</h1>
          </div>
        } />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
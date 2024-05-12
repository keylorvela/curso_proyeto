import { BrowserRouter, Routes, Route } from "react-router-dom";
import Treatments from 'src/views/Treatments.jsx';
import ModifyTreatment from 'src/views/ModifyTreatment.jsx';
import Professors from 'src/views/Professors.jsx';
import Applications from 'src/views/Applications.jsx';


import ManageTreatment from 'src/views/admin/ManageTreatment.jsx';
import ManageCourse from 'src/views/admin/ManageCourse.jsx';
import ManageProfessor from 'src/views/admin/ManageProfessor.jsx';

import ManageAccount from 'src/views/student/ManageAccount.jsx';

import ManageProfessorAccount from 'src/views/professor/ManageProfessorAccount.jsx';


import Students from 'src/views/Students.jsx';

import StudentsByProf from 'src/views/StudentsByProf.jsx';
import MyCourses from 'src/views/MyCourses.jsx';
import Courses from 'src/views/Courses.jsx';
import Login from 'src/views/Login.jsx';
import StudentsNews from 'src/views/StudentsNews.jsx';
import ProfessorNews from 'src/views/ProfessorNews.jsx';
import Test from 'src/views/Test.jsx';

function App() {
  //TODO Add authentication
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="mycourses" element={<MyCourses />} />


        <Route path="professor/courses" element={<MyCourses />} />
        <Route path="professor/news" element={<ProfessorNews />} />
        <Route path="professor/profile" element={<ManageProfessorAccount />} />
        <Route path="professor/students" element={<StudentsByProf />} />

        <Route path="student/news" element={<StudentsNews />} />
        <Route path="student/profile" element={<ManageAccount />} />

        <Route path="admin/students" element={<Students />} />
        <Route path="admin/courses" element={<Courses />} />
        <Route path="admin/course/:id" element={<ManageCourse />} />
        <Route path="admin/course" element={<ManageCourse />} />
        <Route path="admin/professors" element={<Professors />} />
        <Route path="admin/professor/:id" element={<ManageProfessor />} />
        <Route path="admin/professor" element={<ManageProfessor />} />
        <Route path="admin/treatments" element={<Treatments />} />
        <Route path="admin/treatment/:id" element={<ManageTreatment />} />
        <Route path="admin/treatment" element={<ManageTreatment />} />
        <Route path="admin/applications" element={<Applications />} />

        {/*For testing*/}
        <Route path="test" element={<StudentsByProf />} />


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
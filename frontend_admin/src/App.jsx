import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from 'src/views/Login.jsx';

import TreatmentReview from 'src/views/admin/TreatmentReview.jsx';
import Treatments from 'src/views/admin/Treatments.jsx';
import Professors from 'src/views/admin/Professors.jsx';
import Applications from 'src/views/admin/Applications.jsx';
import ManageTreatment from 'src/views/admin/ManageTreatment.jsx';
import ManageCourse from 'src/views/admin/ManageCourse.jsx';
import ManageProfessor from 'src/views/admin/ManageProfessor.jsx';
import Students from 'src/views/admin/Students.jsx';
import Courses from 'src/views/admin/Courses.jsx';

import ManageProfessorAccount from 'src/views/professor/ManageProfessorAccount.jsx';
import StudentsByProf from 'src/views/professor/StudentsByProf.jsx';
import ProfessorNews from 'src/views/professor/ProfessorNews.jsx';

import ManageStudentAccount from 'src/views/student/ManageAccount.jsx';
import StudentsNews from 'src/views/student/StudentsNews.jsx';
import ManageStudent from 'src/views/admin/ManageStudent.jsx';

import MyCourses from 'src/views/MyCourses.jsx';

import useAuth from 'src/components/utils/AuthContext.jsx';

function App() {
  const { isAuthenticated, getUser } = useAuth();

  
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated() ? (
          <>

            {getUser().UserTypeID == 1 && (
              <>
                <Route path="admin" element={<Students />} />
                <Route path="admin/students" element={<Students />} />
                <Route path="admin/student" element={<ManageStudent />} />
                <Route path="admin/courses" element={<Courses />} />
                <Route path="admin/course/:id" element={<ManageCourse />} />
                <Route path="admin/course" element={<ManageCourse />} />
                <Route path="admin/professors" element={<Professors />} />
                <Route path="admin/professor/:id" element={<ManageProfessor />} />
                <Route path="admin/professor" element={<ManageProfessor />} />
                <Route path="admin/treatments" element={<Treatments />} />
                <Route path="admin/treatment/:id" element={<ManageTreatment />} />
                <Route path="admin/treatmentreview/:id" element={<TreatmentReview />} />
                <Route path="admin/treatment" element={<ManageTreatment />} />
                <Route path="admin/applications" element={<Applications />} />
              </>
            )}


            {getUser().UserTypeID == 2 && (
              <>
                <Route path="professor" element={<StudentsByProf />} />
                <Route path="professor/courses" element={<MyCourses />} />
                <Route path="professor/news" element={<ProfessorNews />} />
                <Route path="professor/profile" element={<ManageProfessorAccount />} />
                <Route path="professor/students" element={<StudentsByProf />} />
              </>
            )}


            {getUser().UserTypeID == 3 && (
              <>
                <Route path="student" element={<MyCourses />} />
                <Route path="student/courses" element={<MyCourses />} />
                <Route path="student/news" element={<StudentsNews />} />
                <Route path="student/profile" element={<ManageStudentAccount />} />
              </>
            )}

            {/* For testing */}
            <Route path="test" element={<Treatments />} />
            <Route path="*" element={
              <div className='mx-5 my-5 px-5 py-5 d-flex justify-content-center align-items-center'>
                <h1>404</h1>
              </div>
            } />


          </>

        ) : (

          <>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>

        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

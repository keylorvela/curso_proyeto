import express from 'express';
import cors from 'cors';

import RegisterRoute from "./routes/General/Register.route"

import ApplicationRoute from "./routes/Applications.route"
import CoursesRoute from "./routes/Courses.route"
import LoginRoute from "./routes/Login.route"
import NewsRoute from "./routes/News.route"
import ReviewsRoute from "./routes/Reviews.route"
import StudentsRoute from "./routes/Students.route"
import TeachersRoute from "./routes/Teachers.route"
import TreatmentsRoute from "./routes/Treatments.route"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// General routes
// ---------------------------------------------
app.use("/register", RegisterRoute)
// ---------------------------------------------

// Dedicated routes
// ---------------------------------------------
app.use("/applications", ApplicationRoute);
app.use("/courses", CoursesRoute);
app.use("/login", LoginRoute);
app.use("/news", NewsRoute);
app.use("/reviews", ReviewsRoute);
app.use("/students", StudentsRoute);
app.use("/teachers", TeachersRoute);
app.use("/treatments", TreatmentsRoute);
// ---------------------------------------------

app.listen(port, () => {
  console.clear();
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});

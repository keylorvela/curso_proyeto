import express from 'express';
import cors from 'cors';

import ApplicationRoute from "./src/routes/Applications.route"
import CoursesRoute from "./src/routes/Courses.route"
import LoginRoute from "./src/routes/Login.route"
import NewsRoute from "./src/routes/News.route"
import ReviewsRoute from "./src/routes/Reviews.route"
import StudentsRoute from "./src/routes/Students.route"
import TeachersRoute from "./src/routes/Teachers.route"
import TreatmentsRoute from "./src/routes/Treatments.route"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/applications", ApplicationRoute);
app.use("/courses", CoursesRoute);
app.use("/login", LoginRoute);
app.use("/news", NewsRoute);
app.use("/reviews", ReviewsRoute);
app.use("/students", StudentsRoute);
app.use("/teachers", TeachersRoute);
app.use("/treatments", TreatmentsRoute);

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});

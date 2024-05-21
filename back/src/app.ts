import express from 'express';
import cors from 'cors';

import RegisterRoute from "./routes/General/Register.route"
import UserRoute from "./routes/General/User.route"

import ApplicationRoute from "./routes/Applications.route"
import CoursesRoute from "./routes/Courses.route"
import GroupRoute from "./routes/Group.route"
import LoginRoute from "./routes/Login.route"
import NewsRoute from "./routes/News.route"
import ReviewsRoute from "./routes/Reviews.route"
import StudentsRoute from "./routes/Students.route"
import TeachersRoute from "./routes/Teachers.route"
import TreatmentsRoute from "./routes/Treatments.route"
import CategoriesRoute from "./routes/Categories.route"

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin:true,
  methods:['GET','POST','PUT','DELETE']
}));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));


// General routes
// ---------------------------------------------
app.use("/register", RegisterRoute);
app.use("/user", UserRoute);
// ---------------------------------------------

// Dedicated routes
// ---------------------------------------------
app.use("/applications", ApplicationRoute);
app.use("/courses", CoursesRoute);
app.use("/group", GroupRoute);
app.use("/login", LoginRoute);
app.use("/news", NewsRoute);
app.use("/reviews", ReviewsRoute);
app.use("/students", StudentsRoute);
app.use("/teachers", TeachersRoute);
app.use("/treatments", TreatmentsRoute);
app.use("/categories", CategoriesRoute);
// ---------------------------------------------

app.listen(port, () => {
  console.clear();
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});

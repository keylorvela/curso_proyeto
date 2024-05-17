"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Register_route_1 = __importDefault(require("./routes/General/Register.route"));
const User_route_1 = __importDefault(require("./routes/General/User.route"));
const Applications_route_1 = __importDefault(require("./routes/Applications.route"));
const Courses_route_1 = __importDefault(require("./routes/Courses.route"));
const Group_route_1 = __importDefault(require("./routes/Group.route"));
const Login_route_1 = __importDefault(require("./routes/Login.route"));
const News_route_1 = __importDefault(require("./routes/News.route"));
const Reviews_route_1 = __importDefault(require("./routes/Reviews.route"));
const Students_route_1 = __importDefault(require("./routes/Students.route"));
const Teachers_route_1 = __importDefault(require("./routes/Teachers.route"));
const Treatments_route_1 = __importDefault(require("./routes/Treatments.route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: '*', // Cambia '*' por la URL de tu front-end en producción por razones de seguridad
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "15mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
// General routes
// ---------------------------------------------
app.use("/register", Register_route_1.default);
app.use("/user", User_route_1.default);
// ---------------------------------------------
// Dedicated routes
// ---------------------------------------------
app.use("/applications", Applications_route_1.default);
app.use("/courses", Courses_route_1.default);
app.use("/group", Group_route_1.default);
app.use("/login", Login_route_1.default);
app.use("/news", News_route_1.default);
app.use("/reviews", Reviews_route_1.default);
app.use("/students", Students_route_1.default);
app.use("/teachers", Teachers_route_1.default);
app.use("/treatments", Treatments_route_1.default);
// ---------------------------------------------
app.listen(port, () => {
    console.clear();
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
//# sourceMappingURL=app.js.map
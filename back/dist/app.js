"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("express");
const router = (0, express_2.Router)();
const Applications_route_1 = __importDefault(require("./routes/Applications.route"));
const Courses_route_1 = __importDefault(require("./routes/Courses.route"));
const Login_route_1 = __importDefault(require("./routes/Login.route"));
const News_route_1 = __importDefault(require("./routes/News.route"));
const Reviews_route_1 = __importDefault(require("./routes/Reviews.route"));
const Students_route_1 = __importDefault(require("./routes/Students.route"));
const Teachers_route_1 = __importDefault(require("./routes/Teachers.route"));
const Treatments_route_1 = __importDefault(require("./routes/Treatments.route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/applications", Applications_route_1.default);
app.use("/courses", Courses_route_1.default);
app.use("/login", Login_route_1.default);
app.use("/news", News_route_1.default);
app.use("/reviews", Reviews_route_1.default);
app.use("/students", Students_route_1.default);
app.use("/teachers", Teachers_route_1.default);
app.use("/treatments", Treatments_route_1.default);
const hola = router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Hola");
}));
app.use("/", hola);
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
//# sourceMappingURL=app.js.map
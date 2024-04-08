import styles from 'src/views/Treatments.module.css'
import MainLayout from 'src/components/MainLayout.jsx'
import Treatment from 'src/components/Treatment.jsx'
import ContentTable from 'src/components/ContentTable.jsx'
import Col from 'react-bootstrap/Col'


import { useNavigate } from "react-router-dom";


function Courses() {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/course/${id}`);
    };
    const courses = [
        {
          id: 1,
          nombre: "Curso A",
          explicacion: "Este Curso está diseñado para mejorar la salud mental y física.",
          horarios: ["Lunes 10:00 AM", "Miércoles 3:00 PM", "Viernes 6:00 PM"],
          contenido: "El contenido de este Curso incluye sesiones de terapia, ejercicio físico y meditación."
        },
        {
          id: 2,
          nombre: "Curso B",
          explicacion: "Curso para el control del estrés y la ansiedad.",
          horarios: ["Martes 11:00 AM", "Jueves 5:00 PM", "Sábado 9:00 AM"],
          contenido: "El contenido de este Curso incluye técnicas de respiración, yoga y consejería individual."
        },
        {
          id: 3,
          nombre: "Curso C",
          explicacion: "Curso para mejorar la calidad del sueño.",
          horarios: ["Lunes 8:00 PM", "Miércoles 7:00 PM", "Viernes 9:00 PM"],
          contenido: "El contenido de este Curso incluye consejos de higiene del sueño, relajación muscular y terapia cognitivo-conductual."
        },
        {
          id: 4,
          nombre: "Curso D",
          explicacion: "Curso para el manejo del dolor crónico.",
          horarios: ["Martes 2:00 PM", "Jueves 4:00 PM", "Sábado 11:00 AM"],
          contenido: "El contenido de este Curso incluye ejercicios de rehabilitación, técnicas de manejo del dolor y educación sobre la salud."
        },
        {
          id: 5,
          nombre: "Curso E",
          explicacion: "Curso para el desarrollo personal y la autoestima.",
          horarios: ["Lunes 1:00 PM", "Miércoles 10:00 AM", "Viernes 4:00 PM"],
          contenido: "El contenido de este Curso incluye actividades de empoderamiento, exploración de valores y establecimiento de metas."
        }
      ];
      


    return (
        <MainLayout>

            <div className={styles.page}>

                <div className={styles.main}>
                </div>
                <div className={styles.treatments}>
                    <ContentTable title="Cursos disponibles" >
                        {courses.map((item, index) => (
                            <Col key={index} sm={4}>
                                <Treatment
                                    title={item.nombre}
                                    event={() => handleClick(item.id)}
                                />
                            </Col>
                        ))}
                    </ContentTable>
                </div>
            </div>


        </MainLayout >
    );
}

export default Courses;  
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from 'src/views/CourseView.module.css';

import MainLayout from 'src/components/MainLayout.jsx';
import CourseForm from 'src/components/CourseForm.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import img from 'src/assets/stock2.jpg'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

//Sólo de ejemplo
async function getItem(numero, lista) {
  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1);
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id === parseInt(numero)) {
        return lista[i];
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}




function courseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  //Sólo de ejemplo
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


  useEffect(() => {
    const fetchData = async () => {
      const result = await getItem(id, courses);
      setCourse(result);
    }
    fetchData();
  }, [id]);

  return (
    <MainLayout>
      <div className={styles.page}>
        <Container>
          <Row >
            <Col className={styles.title} xs={12}>
              <h2 className="text-center fs-1 fw-semibold my-3">{course?.nombre}</h2>
            </Col>
          </Row>
          <Row className='mt-5'>

            <Col xs={12} md={8}>
              <h3 className="fs-1 mb-3">Acerca del curso:</h3> <br />
              <p className="fs-3">{course?.explicacion} </p>
            </Col>
            <Col className="align-self-center" xs={12} md={4}>
              <Image src={img} fluid />
            </Col>
          </Row>
          <Row className='mt-5 text-center'>

            <h3 className="fs-1 mb-4">Horarios disponibles:</h3> <br />
            {course?.horarios.map((horario, index) => (
              <Col className="mt-3" key={index}>
                <Badge bg="primary"><p className="mx-2 my-2 fs-5">{horario}</p></Badge>
              </Col>
            ))}

          </Row>
          <Row className="mt-5">

            <Col>
              <h3 className="fs-1 mb-4">Contenido del curso:</h3> <br />

              <p className="fs-3">{course?.contenido} </p>

            </Col>
          </Row>


          {/*Content carousel*/}
          <Row>

            <Col>

            </Col>
          </Row>


          <Row className="mt-5">
            <Col md={6} xs={12} className="me-3">
              <Row>

                <h3 className="fs-1 mb-4">Métodos de pago:</h3> <br />
                <p className="fs-3"> Ofrecemos los siguientes métodos de pago: transferencia bancaria, Sinpe Móvil y link de pago directo con Conexión BP. ¿Listo para realizar tu compra? ¡Contáctanos por WhatsApp y reserva tu espacio!</p>

              </Row>
              <Row>
                <Col>
                  <Button variant="success btn-lg">Agenda tu cita</Button>
                </Col>
                <Col>
                  <Button variant="success btn-lg">Conexión BP</Button>
                </Col>
              </Row>
            </Col>


            <Col className='px-5 pb-5 my-4 border rounded'>
              <CourseForm/>
            </Col>


          </Row>



        </Container>
      </div>
    </MainLayout>
  );
}

export default courseView;

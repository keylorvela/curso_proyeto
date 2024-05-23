import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Alert from 'react-bootstrap/Alert'; // Agrega la importación de Alert
import Loading from 'src/components/utils/Loading.jsx';

import styles from 'src/views/CourseView.module.css';
import commonStyles from 'src/components/Common.module.css';

import MainLayout from 'src/components/MainLayout.jsx';
import CourseForm from 'src/components/CourseForm.jsx';

import sinpe from 'src/assets/Sinpe.svg';
import transferencia from 'src/assets/Transferencia.svg';
import img from 'src/assets/Default-Image.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { FaWhatsapp } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { getCourse } from 'src/services/coursesService.js';
import { getGroupsInCourse } from "../services/groupService";

// import { downloadPaymentReceipt } from 'src/services/applicationService.js';
import CardsInformation from "../components/CardsInformation";

function CourseView() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [groupsInCourse, setGroupsInCourse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCourse(id);
                const groups = await getGroupsInCourse(id);

                setCourse(result);
                setGroupsInCourse(groups);
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {

                setLoading(false);

            }
        }
        fetchData();
    }, [id]);

    const formatCurrency = (value) => {
        return Intl.NumberFormat('es-CR', {
            style: "currency",
            currency: "CRC"
        }).format(value);
    }

    const formatDescription = (description) => {
        const paragraphs = description.split("/");
        return (paragraphs) ? (
            paragraphs.map((paragraph, index) => (
                <p key={index} className="fs-3">{paragraph}</p>
            ))
        ) : (
            <></>
        )
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        return date.toLocaleDateString('es-ES', options);
    }

    return (
        <MainLayout>
            <div className={styles.page}>
                <Container>
                    {loading ? (
                        <div className='text-center'>
                            <Loading size={15} />
                        </div>
                    ) : (
                        /* En caso de que no se encuentre el curso */
                        (!course || Object.keys(course).length === 0) ? (

                            <Alert key='warning' variant='warning'>
                                No se encontró el curso.
                            </Alert>
                        ) : (
                            <>
                                <Row className="pb-5">
                                    <Col className={styles.title} xs={12}>
                                        <h2 className={`text-center fs-1 fw-semibold my-3`}>{course?.Name}</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="align-self-center" xs={12} md={4}>
                                        <Image src={course?.CourseImage || img} fluid />
                                    </Col>
                                    <Col xs={12} md={8}>
                                        {formatDescription(course?.Description)}
                                    </Col>
                                </Row>

                                <CardsInformation
                                    titles={["Duracion:", "Dirigido a:"]}
                                    contents={[course?.Duration, course?.UserTarget]}
                                />
                                <CardsInformation
                                    titles={["Precio:"]}
                                    contents={[`${formatCurrency(course?.Price)}`]}
                                />
                                <CardsInformation
                                    titles={["Incluye:", "Temas:"]}
                                    contents={[course?.Includes, course?.Topics]}
                                />

                                {/* Display available groups */}
                                {
                                    (groupsInCourse.length) ? (
                                        <div>
                                            <span className="fs-2 fw-semibold d-block mb-4" style={{ color: "var(--main-blue)" }}>Grupos disponibles</span>
                                            <div className={`d-flex flex-wrap ${(groupsInCourse.length > 3) ? "justify-content-around" : ""} gap-3`}>
                                                {
                                                    groupsInCourse.map((group) => (
                                                        <Badge className={`${styles.groupSchedule_Badge}`}>
                                                            <p className="fs-6" style={{ margin: "10px 5px" }}>{`Inicia el ${formatDate(group.StartingDate)}`}</p>
                                                            <p className="fs-6" style={{ margin: "10px 5px" }}>{`Horario:`}</p>
                                                            <p className="fs-6" style={{ margin: "10px 5px" }}>{`${group.ScheduleDate} - ${group.ScheduleHour}`}</p>
                                                        </Badge>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <Alert variant="warning" className="text-center">No hay grupos disponibles en este momento</Alert>
                                    )
                                }

                                <Row className="mt-3">
                                    <Col className="my-5" xs={12}>
                                        <h3 className="fs-1 mb-3" style={{ color: "var(--main-blue)" }}>Métodos de pago:</h3>
                                        <br />
                                        <p className="fs-3">Ofrecemos los siguientes métodos de pago: transferencia bancaria, Sinpe Móvil y link de pago directo con Conexión BP. ¿Listo para realizar tu compra? ¡Contáctanos por WhatsApp y agenda tu cita hoy mismo! </p>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    {/**<Col xs={12} sm={6} lg={3}>
                                        <button className={`d-flex align-items-center flex-nowrap justify-content-center gap-1 px-3 py-3 btn mb-2 btn-primary btn-lg ${commonStyles.wtsButton}`}>
                                            <FaWhatsapp /><b className="text-nowrap"> Agenda tu cita </b>
                                        </button>
                                        </Col>**/}
                                    <Col xs={12} sm={6} lg={3}>
                                        <button className={`d-flex align-items-center flex-nowrap justify-content-center gap-1 px-3 py-3 btn mb-2 btn-primary btn-lg ${commonStyles.bpButton}`}>
                                            <FiShoppingCart /><b className="text-nowrap"> Conexión BP</b>
                                        </button>
                                    </Col>
                                    <Col xs={6} sm={6} lg={3}>
                                        <Image src={sinpe} fluid />
                                    </Col>
                                    <Col xs={6} sm={6} lg={3}>
                                        <Image src={transferencia} fluid />
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-center'>
                                    <Col md={6} className={`rounded ${styles.form}`}>
                                        <CourseForm
                                            course = {course}
                                            groupsInCourse={ groupsInCourse }
                                        />
                                    </Col>
                                </Row>
                            </>
                        )
                    )}
                </Container>
            </div>
        </MainLayout>
    );
}

export default CourseView;

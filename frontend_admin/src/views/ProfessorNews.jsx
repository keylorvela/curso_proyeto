import { React, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainLayout from 'src/components/MainLayout.jsx';
import DynamicForm from 'src/components/DynamicForm.jsx';
import BaseModal from 'src/components/utils/BaseModal.jsx';
import styles from 'src/views/ProfessorNews.module.css';

function ProfessorNews() {
    const [modalShow, setModalShow] = useState(false);

    const example = [
        { date: "2024-05-07", description: "¡Nuevo horario de clases!" },
        { date: "2024-05-06", description: "¡Próximo examen el viernes!" },
        { date: "2024-05-05", description: "¡Recuerda entregar tus tareas!" }
    ];
    const [courseName, setCourseName] = useState('Mate');
    const [news, setNews] = useState(example);
    const [professor, setProfessor] = useState('Keylor');
    const [schedule, setSchedule] = useState('N/A');




    //Add news
    const handleFormSubmit = (data) => {
        alert(JSON.stringify(data));
    }

    const fields = [
        {
            id: 'title',
            label: 'Titulo:',
            type: 'text',
            placeholder: 'Ingresa el título de la noticia',
            required: true,
        },
        {
            id: 'content',
            label: 'Mensaje:',
            type: 'textarea',
            placeholder: 'Escribe el contenido de la noticia',
            rows: 2,
            required: true,

        }

    ];

    const buttons = [{ variant: 'primary', type: 'submit', label: 'Publicar' }]


    return (
        <MainLayout type={2}>
            {/* ADD NEWS MODAL*/}
            <BaseModal
                pshow={modalShow}
                setShow={setModalShow}
            >
                <div className = 'px-3'>
                    <DynamicForm
                        fields={fields}
                        onSubmit={handleFormSubmit}
                        buttons={buttons}
                        initialValues={{}}
                    />
                </div>
            </BaseModal>




            <Container fluid style={{ width: '98%' }}>
                <h2 className={styles.courseName}>{courseName}</h2>
                <Row>
                    <Col md={7} className={styles.colCustom}>
                        <div className={styles.newsHeader}>
                            <h3 className={styles.subTitle}>Noticias</h3>
                            <Button onClick={() => setModalShow(true)} variant="primary" className={styles.unsubscribeButton}>Añadir noticia</Button>
                        </div>
                        {news.map((New, index) => (
                            <Card key={index} className={styles.newsCard}>
                                <Card.Body>
                                    <Card.Title className={styles.newsDate}>
                                        <Button variant="link" className={styles.iconButton}>
                                            <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
                                        </Button>
                                        {New.date}
                                    </Card.Title>

                                    <Card.Text className={styles.newsDescription}>{New.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>

                    <Col md={4} className={styles.colCustom}>
                        <h3 className={styles.subTitle}>Información</h3>
                        <p className={styles.subInfo}><strong>Profesor:</strong><br />{professor}</p>
                        <p className={styles.subInfo}><strong>Horarios:</strong><br />{schedule}</p>
                        <p className={styles.subInfo}>
                            <strong>Estudiantes:</strong><br />
                            <Link className={styles.newsDate} to="/professor/students">Ver lista de estudiantes</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default ProfessorNews;

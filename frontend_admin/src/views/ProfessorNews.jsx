import { React, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/ProfessorNews.module.css';

function ProfessorNews() {

    const example = [
        { date: "2024-05-07", description: "¡Nuevo horario de clases!" },
        { date: "2024-05-06", description: "¡Próximo examen el viernes!" },
        { date: "2024-05-05", description: "¡Recuerda entregar tus tareas!" }
    ];
    const [courseName, setCourseName] = useState('Mate');
    const [news, setNews] = useState(example);
    const [professor, setProfessor] = useState('Keylor');
    const [schedule, setSchedule] = useState('N/A');



    return (
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h2 className={styles.courseName}>{courseName}</h2>
                <Row>
                    <Col md={7} className={styles.colCustom}>
                        <div className={styles.newsHeader}>
                            <h3 className={styles.subTitle}>Noticias</h3>
                            <Button variant="primary" className={styles.unsubscribeButton}>Añadir noticia</Button>
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
                            <Link className={styles.newsDate} to="/students">Ver lista de estudiantes</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default ProfessorNews;

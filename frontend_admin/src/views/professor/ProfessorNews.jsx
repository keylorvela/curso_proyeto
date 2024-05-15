import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainLayout from 'src/components/MainLayout.jsx';
import DynamicForm from 'src/components/DynamicForm.jsx';
import BaseModal from 'src/components/utils/BaseModal.jsx';
import styles from 'src/views/professor/ProfessorNews.module.css';

import NewsService from 'src/services/News.service';
import GroupService from 'src/services/Group.service';

function ProfessorNews() {
    // TODO: Obtener el id del grupo
    // TODO: Funcionalidad de borrar noticia
    const location = useLocation();
    const { userID, groupID } = location.state || {};

    const [modalShow, setModalShow] = useState(false);

    const [courseName, setCourseName] = useState('');
    const [news, setNews] = useState([]);
    const [professor, setProfessor] = useState('');
    const [schedule, setSchedule] = useState('');

    async function fetchGroupNews() {
        try {
            // Get list of news
            const news_data = await NewsService.GetNewsList( groupID );
            const news_list = [];
            for (const it_news of news_data) {
                news_list.push({
                    title: it_news.Title,
                    date: it_news.PublishedDate.split('T')[0],
                    description: it_news.Content
                });
            }

            setNews( news_list );

            // Get group information
            const group_data = await GroupService.GetGroupInformation( groupID );
            setCourseName( group_data.Name );
            setProfessor( group_data.TeacherName );
            setSchedule( `${group_data.ScheduleDate}\n${group_data.ScheduleHour}` );

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchGroupNews();
    }, []);


    //Add news
    const handleFormSubmit = async (data) => {
        try {
            await NewsService.PostNews( groupID, data.title, data.content );
            alert("Se publico la noticia");
            setNews([]);
            fetchGroupNews();
            setModalShow(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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

                                    <Card.Subtitle className={styles.newsDate}>{New.title}</Card.Subtitle>
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

import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/student/StudentsNews.module.css';

import NewsService from 'src/services/News.service';
import GroupService from 'src/services/Group.service';

function StudentsNews() {
    // TODO: Obtener el id del grupo
    // TODO: Obtener el id del user
    // TODO: Funcionalidad de "darse de baja"

    const location = useLocation();
    const { userID, groupID } = location.state || {};

    const [courseName, setCourseName] = useState('');
    const [news, setNews] = useState([]);
    const [professor, setProfessor] = useState('');
    const [schedule, setSchedule] = useState('');

    useEffect(() => {
        async function fetchData() {
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

        fetchData();
    }, []);


    return (
        <MainLayout type={3}>
            <Container fluid style={{ width: '98%' }}>
                <h2 className={styles.courseName}>{courseName}</h2>
                <Row>
                    <Col md={7} className={styles.colCustom}>
                        <div className={styles.newsHeader}>
                            <h3 className={styles.subTitle}>Noticias</h3>
                            <Button variant="danger" className={styles.unsubscribeButton}>Darse de baja</Button>
                        </div>
                        {news.map((New, index) => (
                            <Card key={index} className={styles.newsCard}>
                                <Card.Body>
                                    <Card.Title className={styles.newsDate}>{New.date}</Card.Title>
                                    <Card.Subtitle className={`${styles.newsDate} text-start`}>{New.title}</Card.Subtitle>
                                    <Card.Text className={styles.newsDescription}>{New.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>

                    <Col md={4} className={styles.colCustom}>
                        <h3 className={styles.subTitle}>Información</h3>
                        <p className={styles.subInfo}><strong>Profesor:</strong><br />{professor}</p>
                        <p className={styles.subInfo}><strong>Horarios:</strong><br />{schedule}</p>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default StudentsNews;

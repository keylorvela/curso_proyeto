import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import styles from 'src/views/admin/TreatmentReview.module.css';
import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import BaseModal from 'src/components/utils/BaseModal.jsx';
import DynamicForm from 'src/components/DynamicForm.jsx';

import { faTrash, faReplyAll, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReviewsService from 'src/services/Reviews.service';

function TreatmentReview() {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { idTreatment } = useParams() || null;
    const [idReview, setIdReview] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [values, setValues] = useState(location.state?.treatmentInfo);
    const [reviews, setReviews] = useState([]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        return date.toLocaleDateString('es-ES', options);
    };


    async function fetchData() {
        try {
            const data_raw = await ReviewsService.ListReviewsOfTreatment(idTreatment || values.ID);
            const new_data = data_raw.map(review => ({
                ID: review.ID,
                Nombre: review.Name,
                Resena: review.ReviewContent,
                Fecha: formatDate(review.PublishedDate),
                Estrellas: review.Stars,
                Respuesta: review.Response,
            }))
            setReviews(new_data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        fetchData();
    }, []);

    const fields = [
        {
            id: 'content',
            label: 'Respuesta:',
            type: 'textarea',
            placeholder: 'Escribe el contenido de su respuesta',
            rows: 2,
            required: true,

        }
    ];

    //Add reviews
    const handleFormSubmit = async (data) => {
        try {
            await ReviewsService.AddReviewRespond(idReview, data.content);
            setReviews([]);
            fetchData();

            setModalShow(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleRemoveNews = async (reviewID) => {
        try {
            await ReviewsService.RemoveReview(reviewID);

            setReviews(reviews.filter((it_review) => it_review.ID != reviewID));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const buttons = [{ variant: 'primary', type: 'submit', label: 'Responder' }]

    return (
        <MainLayout type={1}>
            <BaseModal
                pshow={modalShow}
                setShow={setModalShow}
            >
                <div className='px-3'>
                    <DynamicForm
                        fields={fields}
                        onSubmit={handleFormSubmit}
                        buttons={buttons}
                        initialValues={{}}
                    />
                </div>
            </BaseModal>

            <Container fluid>
                <h2 className={styles.TreatmentName}>{values.Name}</h2>
                {loading && (
                    <div className='text-center my-5 position-absolute w-100'>
                            <Loading size={11} />
                        </div>
                )}
                <Row>
                    <Col md={11} className={styles.colCustom}>
                        <div className={styles.reviewHeader}>
                            <h3 className={styles.subTitle}>Reseñas</h3>
                        </div>

                        {
                            (reviews.length == 0) ?
                                (
                                    <div className={styles.information_container}>
                                        <span className={styles.noReview_span}>No hay reseñas publicadas</span>
                                    </div>
                                ) :
                                (
                                    reviews.map((review, index) => (
                                        <Card key={index} className={styles.reviewCard}>
                                            <Card.Body>
                                                <Card.Title className={styles.reviewDate}>
                                                    {review.Fecha}
                                                    <span className={styles.starContainer}>
                                                        {Array.from({ length: review.Estrellas }, (_, i) => (
                                                            <FontAwesomeIcon key={i} icon={faStar} className={styles.starIcon} />
                                                        ))}
                                                    </span>
                                                    <Button variant="link" className={styles.iconBtn} onClick={() => { setIdReview(review.ID); setModalShow(true); }}>
                                                        <FontAwesomeIcon icon={faReplyAll} className={styles.trashIcon} />
                                                    </Button>
                                                </Card.Title>

                                                <Card.Subtitle className={styles.reviewDate} style={{ textDecoration: 'underline' }}>{review.Nombre}</Card.Subtitle>
                                                <Card.Text className={styles.reviewDescription}>{review.Resena}</Card.Text>

                                                <Card.Title className={styles.reviewDate}>
                                                    Respuesta:
                                                </Card.Title>

                                                <Card.Subtitle className={styles.reviewDate} style={{ textDecoration: 'underline' }}>Clínica</Card.Subtitle>
                                                <Card.Text className={styles.reviewDescription}>{review.Respuesta || 'No hay respuesta'} </Card.Text>
                                                <Button variant="link" className={styles.iconButton} onClick={() => handleRemoveNews(review.ID)}>
                                                    <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )
                        }
                    </Col>


                </Row>
            </Container>
        </MainLayout>
    );
}

export default TreatmentReview;

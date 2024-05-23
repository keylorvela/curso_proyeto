import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTreatment } from 'src/services/treatmentsService.js';
import ReviewsService from 'src/services/ReviewsService.js';

import sinpe from 'src/assets/Sinpe.svg'
import transferencia from 'src/assets/Transferencia.svg'
import img from 'src/assets/Default-Image.jpg'

import { FaWhatsapp } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import BaseModal from 'src/components/utils/BaseModal.jsx';

import styles from 'src/views/TreatmentView.module.css';
import commonStyles from 'src/components/Common.module.css';

import { Container, Row, Col, Card, Button, Image, Alert, Form } from 'react-bootstrap';

import CardsInformation from "../components/CardsInformation";

function TreatmentView() {
    const { id } = useParams();
    const [treatment, setTreatment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        reviewContent: '',
        rating: 0
    });

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

    async function fetchDataReviews() {
        try {
            const data_raw = await ReviewsService.ListReviewsOfTreatment(id);
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
        async function fetchData() {
            try {
                const data = await getTreatment(id);//
                setTreatment(data);
                fetchDataReviews();

            } catch (error) {
                console.error('Error fetching data:', error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ReviewsService.AddReview(
                formData.name,
                formData.reviewContent,
                formData.rating, id);
            fetchDataReviews()
            setFormData({
                name: '',
                reviewContent: '',
                rating: 0
            });
            setModalShow(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleStarClick = (star) => {
        setFormData({
            ...formData,
            rating: star
        });
    };

    const handleButtonWhats = () => {
        const message = `¡Hola! Quisiera agendar una cita de ${treatment?.Name}`;
        const url = `https://wa.me/50670531476/?text=${encodeURIComponent(message)}`;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }

    };

    const handleButtonPay = () => {
        const url = treatment?.PayLink
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }

    };

    const handleImageTransferencia = () => {
        const textToCopy = "CR13080338200852736531";
        navigator.clipboard.writeText(textToCopy)
    };

    const handleImageSinpe = () => {
        const textToCopy = "70531476";
        navigator.clipboard.writeText(textToCopy)
    };

    return (
        <MainLayout>
            <BaseModal pshow={modalShow} setShow={setModalShow}>
                <div className='px-3'>
                    <h5 className="fs-2 mb-3" style={{ color: "var(--main-blue)" }}>Publicar Reseña</h5>
                    <Form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
                        <Form.Group className={styles.formGroup} controlId="nameInput">
                            <Form.Label >Nombre:</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className={styles.formGroup} controlId="reviewInput">
                            <Form.Label>Comentario:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="reviewContent" value={formData.reviewContent} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className={styles.formGroup} controlId="ratingInput">
                            <Form.Label>Calificación:</Form.Label>
                            <div className="d-flex align-items-center">
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <span
                                        key={index}
                                        className={star <= formData.rating ? styles.starSelected : styles.star}
                                        onClick={() => handleStarClick(star)}
                                    >
                                        {star <= formData.rating ? '⭐' : '☆'}
                                    </span>
                                ))}
                            </div>
                        </Form.Group>

                        <Button variant="primary" className={styles.btnPublicar} type="submit">Publicar</Button>
                    </Form>
                </div>
            </BaseModal>

            {/* Content */}
            <div className={styles.page}>
                <Container>
                    {loading ? (
                        <div className='text-center'>
                            <Loading size={15} />
                        </div>
                    ) : (

                        /* En caso de que no se encuentre el tratamiento */
                        Object.keys(treatment).length === 0 ? (
                            <Alert key='warning' variant='warning'>
                                No se encontró el tratamiento.
                            </Alert>
                        ) : (

                            <>
                                {/* Diseño de tratamiento */}

                                <Row >
                                    <Col className={styles.title} >
                                        <h2 className="text-center fs-1 fw-semibold my-3">{treatment?.Name}</h2>
                                    </Col>
                                </Row>
                                <Row className='my-5'>
                                    <Col className="align-self-center" xs={12} md={4}>
                                        <Image src={treatment?.TreatmentImage || img} fluid />
                                    </Col>
                                    <Col xs={12} md={8}>
                                        {formatDescription(treatment?.Description)}
                                    </Col>
                                </Row>

                                {/* Content carousel */}
                                <CardsInformation
                                    titles={["Incluye:", "Información:"]}
                                    contents={[treatment?.Includes, treatment?.Information]}
                                />
                                <CardsInformation
                                    titles={["Duración del procedimiento:", "Duración del efecto:"]}
                                    contents={[treatment?.ProcedureDuration, treatment?.EffectDuration]}
                                />
                                <CardsInformation
                                    titles={["Precio:"]}
                                    contents={[`${formatCurrency(treatment?.Price)}`]}
                                />

                                <Row className="mt-3">
                                    <Col className="my-5" xs={12}>
                                        <h3 className="fs-1 mb-3" style={{ color: "var(--main-blue)" }}>Métodos de pago:</h3>
                                        <br />
                                        <p className="fs-3">Ofrecemos los siguientes métodos de pago: transferencia bancaria, Sinpe Móvil y link de pago directo con Conexión BP. ¿Listo para realizar tu compra? ¡Contáctanos por WhatsApp y agenda tu cita hoy mismo! </p>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col xs={12} sm={6} lg={3}>
                                        <button className={`d-flex align-items-center flex-nowrap justify-content-center gap-1 px-3 py-3 btn mb-2 btn-primary btn-lg ${commonStyles.wtsButton}`}
                                            onClick={handleButtonWhats}>
                                            <FaWhatsapp size={30} /><b className="text-nowrap mx-2">Agenda tu cita </b>
                                        </button>
                                    </Col>
                                    <Col xs={12} sm={6} lg={3}>
                                        <button onClick={handleButtonPay} className={`d-flex align-items-center flex-nowrap justify-content-center gap-1 px-3 py-3 btn mb-2 btn-primary btn-lg ${commonStyles.bpButton}`}>
                                            <FiShoppingCart /><b className="text-nowrap"> Conexión BP</b>
                                        </button>
                                    </Col>
                                    <Col xs={6} sm={6} lg={3}>
                                        <div onClick={handleImageSinpe} style={{ cursor: 'pointer' }}>
                                            <Image src={sinpe} fluid />
                                        </div>
                                    </Col>

                                    <Col xs={6} sm={6} lg={3}>
                                        <div onClick={handleImageTransferencia} style={{ cursor: 'pointer' }}>
                                            <Image src={transferencia} fluid />
                                        </div>
                                    </Col>

                                </Row>


                                {/* Review Section */}
                                <Row className={styles.fixedRow}>
                                    <Col md={12} className={styles.colCustom}>
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
                                                                            <span key={i} className={styles.starIcon}>⭐</span>
                                                                        ))}
                                                                    </span>

                                                                </Card.Title>

                                                                <Card.Subtitle className={styles.reviewDate} style={{ textDecoration: 'underline' }}>{review.Nombre}</Card.Subtitle>
                                                                <Card.Text className={styles.reviewDescription}>{review.Resena}</Card.Text>

                                                                <Card.Title className={styles.reviewDate}>
                                                                    Respuesta:
                                                                </Card.Title>

                                                                <Card.Subtitle className={styles.reviewDate} style={{ textDecoration: 'underline' }}>Clínica</Card.Subtitle>
                                                                <Card.Text className={styles.reviewDescription}>{review.Respuesta || 'No hay respuesta'} </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    ))
                                                )
                                        }

                                    </Col>

                                </Row>
                                <Button variant="primary" className={styles.btnPublicar} onClick={() => { setModalShow(true) }}>
                                    Publicar reseña
                                </Button>
                            </>
                        )
                    )}
                </Container>
            </div>
        </MainLayout>
    );
}

export default TreatmentView;

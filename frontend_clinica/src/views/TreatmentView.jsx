import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTreatment } from 'src/services/treatmentsService.js';

import sinpe from 'src/assets/Sinpe.svg'
import transferencia from 'src/assets/Transferencia.svg'
import img from 'src/assets/stock2.jpg'

import { FaWhatsapp } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';

import styles from 'src/views/TreatmentView.module.css';
import commonStyles from 'src/components/Common.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import CardsInformation from "../components/CardsInformation";

function TreatmentView() {
    const { id } = useParams();
    const [treatment, setTreatment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getTreatment(id);
                setTreatment(data);
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

    return (
        <MainLayout>
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
                                        <Image src={img || treatment.TreatmentImage} fluid />
                                    </Col>
                                    <Col xs={12} md={8}>
                                        { formatDescription(treatment?.Description) }
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
                                        <button className={`d-flex align-items-center flex-nowrap justify-content-center gap-1 px-3 py-3 btn mb-2 btn-primary btn-lg ${commonStyles.wtsButton}`}>
                                            <FaWhatsapp/><b className="text-nowrap"> Agenda tu cita </b>
                                        </button>
                                    </Col>
                                    <Col xs={12} sm={6} lg={3}>
                                        <button className={`d-flex align-items-center flex-nowrap justify-content-center gap-1 px-3 py-3 btn mb-2 btn-primary btn-lg ${commonStyles.bpButton}`}>
                                            <FiShoppingCart/><b className="text-nowrap"> Conexión BP</b>
                                        </button>
                                    </Col>
                                    <Col xs={6} sm={6} lg={3}>
                                        <Image src={sinpe} fluid />
                                    </Col>
                                    <Col xs={6} sm={6} lg={3}>
                                        <Image src={transferencia} fluid />
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

export default TreatmentView;

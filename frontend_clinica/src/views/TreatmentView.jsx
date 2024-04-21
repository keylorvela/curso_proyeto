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
                  <Col className={styles.title} xs={10}>
                    <h2 className="text-center fs-1 fw-semibold my-3">{treatment?.Name}</h2>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col className="align-self-center" xs={12} md={4}>
                    <Image src={img} fluid />
                  </Col>
                  <Col xs={12} md={8}>
                    <p className="fs-3">{treatment?.llamativo}</p>
                    <p className="fs-3">{treatment?.Description}</p>
                    <p className="fs-3">{treatment?.Information}</p>
                  </Col>
                </Row>

                {/* Content carousel */}
                <Row>
                  <Col></Col>
                </Row>

                <Row className="mt-5">
                  <Col className="my-5" xs={12}>
                    <h3 className="fs-1 mb-3">Métodos de pago:</h3>
                    <br />
                    <p className="fs-3">Ofrecemos los siguientes métodos de pago: transferencia bancaria, Sinpe Móvil y link de pago directo con Conexión BP. ¿Listo para realizar tu compra? ¡Contáctanos por WhatsApp y agenda tu cita hoy mismo! </p>
                  </Col>
                </Row>

                <Row className='d-flex text-center justify-content-center mb-3'>
                  <Col>
                    <button className={`px-3 py-3 btn btn-primary btn-lg ${commonStyles.wtsButton}`}>
                      <FaWhatsapp className="me-3" /><b> Agenda tu cita </b>
                    </button>
                  </Col>
                  <Col>
                    <button className={`px-3 py-3 btn btn-primary btn-lg ${commonStyles.bpButton}`}>
                      <FiShoppingCart className="me-3" /><b> Conexión BP</b>
                    </button>
                  </Col>
                  <Col>
                    <Image src={sinpe} width={125} height={125} />
                  </Col>
                  <Col>
                    <Image src={transferencia} width={125} height={125} />
                  </Col>
                </Row>

                <Row className='d-flex text-center justify-content-center my-3'></Row>
              </>
            )
          )}
        </Container>
      </div>
    </MainLayout>
  );
}

export default TreatmentView;

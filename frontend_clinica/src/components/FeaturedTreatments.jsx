import styles from 'src/components/FeaturedTreatments.module.css'

import Treatment from 'src/components/Treatment.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img from 'src/assets/stock2.jpg'

function FeaturedTreatments() {

    const handleButton = () => {
        alert('Ver tratamiento');
    };

    return (
        <>
            <main className={styles.body}>
                <h2 className='ms-5 mt-1 mb-5 fw-light'>Tratamientos destacados:</h2>
                <Container className='d-flex justify-content-end'>
                    <Row>
                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                description="Descripción del treatment"
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>
                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                description="Descripción del treatment"
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>
                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                description="Descripción del treatment"
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>
                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                description="Descripción del treatment"
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>

                    </Row>
                </Container>

            </main>
        </>
    );


}


export default FeaturedTreatments;
import styles from 'src/components/FeaturedTreatments.module.css'

import Treatment from 'src/components/Treatment.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img from 'src/assets/stock2.jpg'

function FeaturedTreatments() {

    const treatments = {
        "all": [
            {
                "id": 1,
                "name": "Limpieza facial"
            },
            {
                "id": 2,
                "name": "Peeling químico"
            },
            {
                "id": 3,
                "name": "Microdermoabrasión"
            },
            {
                "id": 4,
                "name": "Radiofrecuencia facial"
            },
            {
                "id": 5,
                "name": "Mesoterapia facial"
            },
            {
                "id": 6,
                "name": "Botox"
            }
        ]
    }

    const handleButton = () => {
        alert('Ver tratamiento');
    };

    return (
        <>
            <main className={styles.body}>
                <Container className='d-flex justify-content-end gap-3'>
                    <Row>
                        {treatments.all.map(tratamiento => (
                            <Col sm={3} key={tratamiento.id}>
                                <Treatment
                                    photo={img}
                                    name={tratamiento.name} 
                                    event={handleButton} 
                                    className={styles.treatment} 
                                />
                            </Col>
                        ))}

                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                name="Treatment Name"
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>
                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                name="Treatment Name"
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>
                        <Col sm={3}>
                            <Treatment
                                photo={img}
                                name="Treatment Name"
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
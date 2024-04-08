import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';
import img from 'src/assets/stock2.jpg';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Treatment({ title, event }) {

    return (

        <>
            <main className={styles.body}>
                <Container className='text-center'>
                    <Row>
                        <Col>
                            <Image src={img} rounded fluid />
                        </Col>
                    </Row> 
                    <Row>
                        <Col>
                           <h2 className="fs-2 mt-3">{title} </h2>
                        </Col>
                    </Row> 
                    <Row className='my-4'>
                        <Col >
                            <Button variant = "outline-success btn-lg" onClick={event}>
                                Más información
                            </Button>
                        </Col>
                    </Row>
                    <Row className='my-4'>
                        <Col>
                        <Button variant="success btn-lg" >
                                <b>Realizar consulta</b>
                        </Button>
                        </Col>
                    </Row>
                </Container>
            </main>

        </>

    );

}


export default Treatment;
import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';
import img from 'src/assets/stock2.jpg';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Stack from 'react-bootstrap/Stack';


function Treatment({ title, event }) {

    return (

        <>
            <main className={styles.body}>

                <Stack gap = {2} className = 'px-3 py-2'>

                    <Image src={img} rounded fluid />

                    <p className="text-center fw-medium fs-2 mt-3" >{title}</p>

                    <Button className = 'my-2' variant="outline-success btn-lg" onClick={event}>
                        Más información
                    </Button>

                    <Button className = 'my-2' variant="success btn-lg" >
                        <b>Realizar consulta</b>
                    </Button>

                </Stack>
            </main>

        </>

    );

}


export default Treatment;
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

                <Stack className='px-3 py-2 h-100 justify-content-between'>
                    <div>
                        <Image src={img} rounded fluid />
                        <p className="text-center fw-medium fs-2 mt-3" >{title}</p>
                    </div>

                    <div>
                        <Button className = 'my-2 w-100' variant="outline-success btn-lg" onClick={event}>
                            Más información
                        </Button>
                        <Button className = 'my-2 w-100' variant="success btn-lg" >
                            <b>Realizar consulta</b>
                        </Button>
                    </div>

                </Stack>
            </main>

        </>

    );

}


export default Treatment;
import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';
import img from 'src/assets/stock2.jpg';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Stack from 'react-bootstrap/Stack';


function Treatment({ title, event, image }) {

    return (

        <>
            <main className={styles.body}>
                <Stack className='px-3 py-2 h-100 justify-content-between'>
                    <div style={{ height: "300px", width: "100%" }}>
                        <Image src={image} rounded style={{ height: "100%", width: "100%", objectFit: "cover"  }}/>
                    </div>
                    <p className="text-center fw-medium fs-4 mt-3" >{title}</p>
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
import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import Stack from 'react-bootstrap/Stack';


function Treatment({ title, event, image, isTreatment = true }) {

    const handleAskForProduct = () => {
        const whatsappLink = (isTreatment) ? "https://wa.me/50670531476" : "https://wa.me/50661286160";
        const defaultMessage = (isTreatment) ?
            `Hola! Me gustaría más información sobre el tratamiento ${title}.`
            :
            `Hola! Me gustaría más información sobre el curso ${title}.`;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = `${whatsappLink}?text=${defaultMessage}`;

        if (isMobile) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    }

    return (
        <>
            <main className={styles.body}>
                <Stack className='px-3 py-2 h-100 justify-content-between'>
                    <div style={{ height: "300px", width: "100%" }}>
                        <Image src={image} rounded style={{ height: "100%", width: "100%", objectFit: "cover"  }}/>
                    </div>
                    <p className="text-center fw-medium fs-4 mt-3" >{title}</p>
                    <div>
                        <Button className='my-2 w-100' variant="outline-success btn-lg" onClick={event}>
                            Más información
                        </Button>
                        <Button className = 'my-2 w-100' variant="success btn-lg" onClick={() => handleAskForProduct()}>
                            <b>Realizar consulta</b>
                        </Button>
                    </div>
                </Stack>
            </main>

        </>

    );

}


export default Treatment;
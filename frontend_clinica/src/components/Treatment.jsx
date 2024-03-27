import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


function Treatment({ photo, description, event }) {

    return (

        <>
            <main className={styles.body}>
                <Image src={photo} fluid />
                <p className = 'mt-3'> {description} </p>
                <button className={`fw-bold ${styles.btn}`} onClick={event}>
                    Más info
                </button>
            </main>

        </>

    );

}


export default Treatment;
import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';




function Treatment({ photo, name, event }) {

    return (

        <>
            <main className={styles.body}>
                <Image src={photo} fluid />
                <p className={styles.font}> {name} </p>
                <Link to="/treatments" className={`fw-bold ${styles.font}`}>
                    Ver detalles
                </Link>
                <button className={`fw-bold ${styles.btn}`} onClick={event}>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.5em' }} />
                </button>
            </main>

        </>

    );

}


export default Treatment;
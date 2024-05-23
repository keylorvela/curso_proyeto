import styles from 'src/components/Treatment.module.css'
import Image from 'react-bootstrap/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';
import noImage from 'src/assets/noImage.jpg'




function Treatment({ treatmentInfo, event, detailsEvent, photo }) {


    return (

        <>
            <main className={`${styles.body} d-flex flex-column justify-content-between`}>
                <div>
                    <Image src={photo || noImage} fluid className={styles.img} />
                    <p className={styles.font}> {treatmentInfo.Name} </p>
                </div>
                <div className='d-flex justify-content-between'>
                    <Link onClick={() => detailsEvent(treatmentInfo)} className={`fw-bold ${styles.font}`}>
                        Ver detalles
                    </Link>
                    <button className={`fw-bold ${styles.btn}`} onClick={() => event(treatmentInfo)}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.5em' }} />
                    </button>
                </div>
            </main>

        </>

    );

}


export default Treatment;
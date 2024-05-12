import MainLayout from 'src/components/MainLayout.jsx'
import FeaturedTreatments from 'src/components/FeaturedTreatments.jsx'
import styles from 'src/views/admin/Treatments.module.css';

import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Treatments() {

    const navegate = useNavigate();

    const handleRedirect = () => {
        navegate('/modifyTreatment/new');
    };

    return (
        <MainLayout type = {1}>
            <h1 className={styles.title}>Tratamientos</h1>
            <div className={styles.line}></div>
            <div className="d-flex justify-content-end">
                <Button variant="primary" className={styles.customButton} onClick={handleRedirect}>Añadir Tratamiento</Button>
            </div>
            <div className={styles.line}></div>
            <FeaturedTreatments></FeaturedTreatments>
        </MainLayout>
    );
}

export default Treatments;
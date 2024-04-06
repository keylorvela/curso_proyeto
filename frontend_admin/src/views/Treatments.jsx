import MainLayout from 'src/components/MainLayout.jsx'
import FeaturedTreatments from 'src/components/FeaturedTreatments.jsx'
import styles from 'src/views/Treatments.module.css';
import Button from 'react-bootstrap/Button';


function Treatments() {
    return (
        <MainLayout>
            <h1 className={styles.title}>Tratamientos</h1>
            <div className={styles.line}></div>
            <div className="d-flex justify-content-end">
                <Button variant="primary" className={styles.customButton}>Añadir Tratamiento</Button>
            </div>
            <div className={styles.line}></div>
            <FeaturedTreatments></FeaturedTreatments>
        </MainLayout>
    );
}

export default Treatments;
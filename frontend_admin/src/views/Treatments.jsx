import MainLayout from 'src/components/MainLayout.jsx'
import FeaturedTreatments from 'src/components/FeaturedTreatments.jsx'
import Button from 'react-bootstrap/Button';


function Treatments() {
    return (
        <MainLayout>
            <div className="d-flex justify-content-end">
                <Button variant="primary">Agregar</Button>
            </div>

            <FeaturedTreatments></FeaturedTreatments>
        </MainLayout>
    );
}

export default Treatments;
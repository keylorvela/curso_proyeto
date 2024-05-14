import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from 'src/components/FeaturedTreatments.module.css'

import Treatment from 'src/components/Treatment.jsx'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img from 'src/assets/stock2.jpg'
import TreatmentsService from 'src/services/Treatments.service.js';
import Loading from 'src/components/utils/Loading.jsx';

function FeaturedTreatments() {

    const [loading, setLoading] = useState(true);
    const navegate = useNavigate();
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        const getTreatments = async () => {
            try {
                const treatmentsData = await TreatmentsService.getTreatments();
                setTreatments(treatmentsData);
            } catch (error) {
                console.error('getTreatments fail:', error);
            } finally {
                setLoading(false);
            }
        };
        getTreatments();
    }, []);


    const handleButton = (treatmentInfo) => {
        navegate('/modifyTreatment/' + treatmentInfo.Name, {
            state: { treatmentInfo }
        });
    };

    return (
        <>
            <main className={styles.body}>
                {loading && (
                    <div className='text-center my-5'>
                        <Loading size={15} />
                    </div>
                )}
                <Row>
                    {treatments?.map(tratamiento => (
                        <Col sm={6} md={3} key={tratamiento.ID}>
                            <Treatment
                                photo={img}
                                treatmentInfo={tratamiento}
                                event={handleButton}
                                className={styles.treatment}
                            />
                        </Col>
                    ))}
                </Row>
            </main>
        </>
    );


}


export default FeaturedTreatments;
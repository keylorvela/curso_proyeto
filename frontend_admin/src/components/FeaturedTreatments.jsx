import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from 'src/components/FeaturedTreatments.module.css'

import Treatment from 'src/components/Treatment.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img from 'src/assets/stock2.jpg'
import TreatmentsService from 'src/services/Treatments.service.js';

function FeaturedTreatments() {

    const navegate = useNavigate();
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        const getTreatments = async () => {
            try {
                const treatmentsData = await TreatmentsService.getTreatments();
                setTreatments(treatmentsData);
            } catch (error) {
                console.error('getTreatments fail:', error);
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
                <Row>
                    {treatments?.map(tratamiento => (
                        <Col sm={3} key={tratamiento.ID}>
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
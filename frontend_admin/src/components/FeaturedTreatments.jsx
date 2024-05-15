import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from 'src/components/FeaturedTreatments.module.css'

import Treatment from 'src/components/Treatment.jsx'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TreatmentsService from 'src/services/Treatments.service.js';
import Loading from 'src/components/utils/Loading.jsx';
import TableModal from 'src/components/utils/TableModal.jsx';
import noImage from 'src/assets/noImage.jpg'

function FeaturedTreatments() {

    const [loading, setLoading] = useState(true);
    const navegate = useNavigate();
    const [treatments, setTreatments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

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


    const handleEditTreatment = (treatmentInfo) => {
        navegate('/admin/treatment/' + treatmentInfo.ID, {
            state: { treatmentInfo }
        }); 
    };

    const handleButtonDetails = async (treatmentInfo) => {
        setModalData(treatmentInfo);
        alert(JSON.stringify(treatmentInfo))
        setShowModal(true);
    };


    const handleModalClose = () => {
        setShowModal(false);
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
                                photo={tratamiento.ImageUrl}
                                treatmentInfo={tratamiento}
                                event={handleEditTreatment}
                                detailsEvent={handleButtonDetails}
                                className={styles.treatment}
                            />
                        </Col>
                    ))}
                </Row>
                {showModal && modalData && (
                    <TableModal
                        show={showModal}
                        onHide={handleModalClose}
                        title={modalData.Name}
                        photo={modalData.ImageUrl || noImage}
                        roundedPhoto={false}
                        labels={[
                            { title: "Descripción", content: modalData.Description },
                            { title: "Precio", content: modalData.Price },
                            { title: "Duración", content: modalData.ProcedureDuration },
                            { title: "Información", content: modalData.Information },
                        ]}
                    />
                )}
            </main>
        </>
    );


}


export default FeaturedTreatments;
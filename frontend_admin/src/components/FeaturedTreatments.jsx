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

    const handleTreatmentReview = () => {
        const treatmentInfo = modalData;
        navegate('/admin/treatmentreview/' + modalData.ID, {
            state: {treatmentInfo}
        }); 
    };
    

    const handleButtonDetails = async (treatmentInfo) => {
        setModalData(treatmentInfo);
        setShowModal(true);
    };


    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <main className={styles.body}>
                {loading && (
                    <div className='text-center my-5 position-absolute w-100'>
                            <Loading size={11} />
                        </div>
                )}
                <Row className={styles.cardsContainer}>
                    {treatments?.map(tratamiento => (
                        <Col className={styles.cardTreatment} key={tratamiento.ID}>
                            <Treatment
                                photo={tratamiento.TreatmentImage}
                                treatmentInfo={tratamiento}
                                event={handleEditTreatment}
                                detailsEvent={handleButtonDetails}
                            />
                        </Col>
                    ))}
                </Row>
                {showModal && modalData && (
                    <TableModal
                        show={showModal}
                        onHide={handleModalClose}
                        title={modalData.Name}
                        photo={modalData.TreatmentImage || noImage}
                        roundedPhoto={false}
                        reviewButton={{ text: "Ver reseñas", onClick: handleTreatmentReview }}
                        labels={[
                            { title: "Descripción", content: modalData.Description || "No se especifico una descripción" },
                            { title: "Precio", content: modalData.Price || "No se coloco el precio" },
                            { title: "Duración", content: modalData.ProcedureDuration || "No se coloco la duración" },
                            { title: "Información", content: modalData.Information || "No se especifico información" },
                        ]}
                    />
                )}
            </main>
        </>
    );


}


export default FeaturedTreatments;
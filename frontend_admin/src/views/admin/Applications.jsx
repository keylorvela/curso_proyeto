import React, { useState, useEffect } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';
import YesNoModal from 'src/components/utils/YesNoModal.jsx';
import LoadModal from 'src/components/utils/LoadModal.jsx';

import Container from 'react-bootstrap/Container';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import applicationsService from 'src/services/Applications.service.js';

function Applications() {
    // For feedback
    const [loading, setLoading] = useState(true);
    const [showYN, setYN] = useState(false);
    const [load, setLoad] = useState(false);

    const columns = ['ID', 'StudentName', 'Email'];
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get courses
                const data_raw = await applicationsService.getApplications();
                console.log(data_raw);
                setData(data_raw);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleButtonDetails = (rowData) => {
        setModalData(rowData);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleReject = async () => {
        const result = await applicationsService.respondApplication(modalData.ID, 'Rechazado');
        if (result) {
            setShowModal(false);
            setYN(false);
        }
    };

    const handleRejectButton = () => {
        setYN(true);
    };

    const handleAccept = async () => {
        const result = await applicationsService.respondApplication(modalData.ID, 'Aceptado');
        if (result) {
            setShowModal(false);
        }
    };

    const handleDownloadDocument = async () => {
        try {
            setLoad(true);
            await applicationsService.downloadPaymentReceipt(modalData.ID);
        } catch (error) {
            alert('Error descargando el archivo');
        } finally {
            setLoad(false);
        }
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ];

    return (
        <MainLayout type={1}>


            <LoadModal pshow={load} msg="Descargando archivo..." />

            <YesNoModal
                question="Está seguro que se desea continuar?"
                showAlert={showYN}
                setShowAlert={setYN}
                handleYes={handleReject}
            /><Container fluid>
                <h1 className={styles.tableTitle}>Solicitudes de matrícula</h1>

                {loading ? (
                    <div className='text-center my-5'>
                        <Loading size={15} />
                    </div>
                ) : (
                    <>
                        <DynamicTable
                            columns={columns}
                            data={data}
                            buttons={btn}
                        />

                        {showModal && modalData && (
                            <TableModal
                                show={showModal}
                                onHide={handleModalClose}
                                title="Solicitud"
                                linkText="Ver comprobante"
                                linkFunction={handleDownloadDocument}
                                acceptButton={{ text: 'Aceptar', onClick: handleAccept }}
                                rejectButton={{ text: 'Rechazar', onClick: handleRejectButton }}
                                labels={[
                                    { title: 'Nombre', content: modalData.StudentName },
                                    { title: 'Email', content: modalData.Email },
                                    { title: 'Curso', content: modalData.CourseName },
                                    { title: 'Fecha', content: modalData.Date},
                                ]}
                            />
                        )}
                    </>
                )}
            </Container>

        </MainLayout>
    );
}

export default Applications;

import React, { useState, useEffect } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';
import YesNoModal from 'src/components/utils/YesNoModal.jsx';
import LoadModal from 'src/components/utils/LoadModal.jsx';

import AlertModal from 'src/components/utils/AlertModal.jsx'

import {formatDate} from 'src/services/utilities/utils.js'

import Container from 'react-bootstrap/Container';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import applicationsService from 'src/services/Applications.service.js';

function Applications() {
    // For feedback
    const [loading, setLoading] = useState(true);
    const [showYN, setYN] = useState(false);
    const [load, setLoad] = useState(false);
    const [msg, setMsg] = useState(false);

    const columns = ['ID', 'StudentName', 'Email'];
    const [data, setData] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertApplications, setShowAlertApplications] = useState(false);
    
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
        setMsg("Rechazando aplicación...");
        setLoad(true);
        const result = await applicationsService.respondApplication(modalData.ID, 'Rechazado');
        if (result) {
            setShowModal(false);
            setYN(false);
            setData(data.filter(objeto => objeto.ID !== modalData.ID));
        }
        setLoad(false);
        
    };

    const handleRejectButton = () => {
        setYN(true);
    };

    const handleAccept = async () => {
        setMsg("Aceptando aplicación...");
        setLoad(true);
        const result = await applicationsService.respondApplication(modalData.ID, 'Aceptado');
        if (result) {
            setShowModal(false);
            setData(data.filter(objeto => objeto.ID !== modalData.ID));
        }
        setLoad(false);

    };

    const handleDownloadDocument = async () => {
        try {
            setMsg("Descargando archivo...");
            setLoad(true);
            await applicationsService.downloadPaymentReceipt(modalData.ID);
        } catch (error) {
            setAlertMessage("Error al descargar el archivo");
            setShowAlertApplications(true);
        } finally {
            setLoad(false);
        }
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ];

    return (
        <MainLayout type={1}>
            <LoadModal pshow={load} msg={msg} />
            <AlertModal
                type="light"
                title="Información"
                message={alertMessage}
                showAlert={showAlertApplications}
                setShowAlert={setShowAlertApplications}
            />

            <YesNoModal
                question="Está seguro que se desea continuar?"
                showAlert={showYN}
                setShowAlert={setYN}
                handleYes={handleReject}
            /><Container fluid>
                <h1 className={styles.tableTitle}>Solicitudes de matrícula</h1>

                {loading ? (
                    <div className='text-center my-5 position-absolute w-100'>
                            <Loading size={11} />
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
                                    { title: 'Fecha', content: formatDate(modalData.Date)},
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

import React, { useState, useEffect } from 'react';
import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';
import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import applicationsService from 'src/services/Applications.service.js'

function Applications() {
    const [loading, setLoading] = useState(false);
    const columns = ['ID', 'StudentName', 'Email'];
    const [data, setData] = useState([]);



    useEffect(() => {
        async function fetchData() {
            try {
                // Get courses
                const data_raw = await applicationsService.getApplications();
                console.log(data_raw)
                setData(data_raw);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
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
        const result = await applicationsService.respondApplication(modalData.ID, 'Rechazado')
        if (result) {
            alert("Aplicación rechazada");
            showModal(false);

        }
    };

    const handleAccept = async () => {
        const result = await applicationsService.respondApplication(modalData.ID, "Aceptado")
        if (result) {
            alert("Aplicación aceptada");
            showModal(false);
        }
    };

    const handleDownloadDocument = async (id) => {
        //TODO Better the handling and give better feedback
        try {
            const success = await applicationsService.downloadPaymentReceipt(modalData.ID);
            if (!success) {
                console.error('Failed to download payment receipt');
            } else {
                alert("Descargando", id);
            }
        } catch (error) {
            console.error('Error downloading payment receipt:', error);
        }
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ];

    return (
        <MainLayout type={1}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.tableTitle}>Solicitudes de matrícula</h1>

                {loading && (
                    <div className='text-center my-5'>
                        <Loading size={15} />
                    </div>
                )}

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
                        linkFunction={() => handleDownloadDocument(modalData.ID)}
                        acceptButton={{ text: "Aceptar", onClick: handleAccept }}
                        rejectButton={{ text: "Rechazar", onClick: handleReject }}
                        labels={[
                            { title: "Nombre", content: modalData.StudentName },
                            { title: "Email", content: modalData.Email },
                            { title: "Curso", content: modalData.ID },
                            { title: "Fecha", content: "12/12/2000" },
                        ]}
                    />
                )}
            </Container>
        </MainLayout>
    );
}

export default Applications;

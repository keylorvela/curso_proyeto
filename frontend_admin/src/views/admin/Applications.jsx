import React, { useState } from 'react';
import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';
import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Applications() {
    const columns = ['ID', 'Nombre', 'Email']; 
    const data = [
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'María', Email: 'maria@example.com' },
        {ID: '284283749', Nombre: 'Pedro', Email: 'pedro@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
    ];

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleButtonDetails = (rowData) => {
        setModalData(rowData);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleReject = () => {
        alert(`Rechazado... ${modalData.Nombre}`);
    };

    const handleAccept = () => {
        alert(`Aceptado... ${modalData.Nombre}`);
    };

    const handleDownloadDocument = () => {
        alert(`Descargando...${modalData.Nombre}`);
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ];

    return (
        <MainLayout type={1}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.tableTitle}>Solicitudes de matrícula</h1>
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
                        acceptButton={{ text: "Aceptar", onClick: handleAccept }}
                        rejectButton={{ text: "Rechazar", onClick:  handleReject}}
                        labels={[
                            { title: "Nombre", content: modalData.Nombre },
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

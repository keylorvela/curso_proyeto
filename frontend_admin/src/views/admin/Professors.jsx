import React, { useEffect, useState } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/CommonTable.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import TeachersService from 'src/services/Teachers.service';

function Professors() {
    const columns = ['Nombre', 'Email'];
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get profesors list
                const data_raw = await TeachersService.GetTeachersList();
                const new_data = data_raw.map(teacher => ({
                    Nombre: teacher.Name,
                    Email: teacher.Email,
                }))

                setData(new_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleButtonEdit = (rowData) => {
        alert(`Botón clickeado para ${rowData.Nombre}`);
    };

    const handleButtonDetails = (rowData) => {
        setModalData(rowData);
        setShowModal(true);
    };


    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleButtonAdd = () => {
        alert(`BotónADD`);
    };
    const btn = [
        { button: faPen, onButtonClick: handleButtonEdit },
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Profesores</h1>

                {
                    data.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={data}
                        buttons={btn}
                        mainButton='Añadir Profesor'
                        mainButtonClick={handleButtonAdd}
                        isSearching={true}
                        searchKey='Nombre'
                    />
                }

                {showModal && modalData && (
                    <TableModal
                        show={showModal}
                        onHide={handleModalClose}
                        title="Profesor"
                        photo="src/assets/stock2.jpg"
                        roundedPhoto={true}
                        labels={[
                            { title: "Nombre", content: modalData.Nombre },
                            { title: "Email", content: modalData.Email },
                            { title: "Teléfono", content: modalData.Nombre },
                            { title: "Identificación", content: modalData.Email },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default Professors;

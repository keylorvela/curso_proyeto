import React, { useEffect, useState } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import StudentService from '../services/Students.service';

function StudentsByProf() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const columns = ['Nombre', 'Email', 'Teléfono']; //Consistency between columnName-dataKeyName

    useEffect(() => {
        async function fetchData() {
            try {
                // Get students
                const data_raw = await StudentService.GetStudentList();
                const new_data = data_raw.map(student => ({
                    ID: student.UserID,
                    Nombre: student.Name,
                    Email: student.Email
                }))

                setData(new_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleButtonDetails = (rowData) => {
        setModalData(rowData);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Lista de estudiantes</h1>

                {
                    data.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={data}
                        buttons={btn}
                        isSearching={true}
                        searchKey='Nombre'
                    />
                }

                {showModal && modalData && (
                    <TableModal
                        show={showModal}
                        onHide={handleModalClose}
                        title={modalData.Nombre}
                        photo="src/assets/stock2.jpg"
                        roundedPhoto={true}
                        labels={[
                            { title: "Estado", content: modalData.Nombre },
                            { title: "Email", content: modalData.Email },
                            { title: "Curso", content: modalData.Email },
                            { title: "Teléfono", content: modalData.ID },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default StudentsByProf;

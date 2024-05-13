import React, { useEffect, useState } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import StudentService from 'src/services/Students.service';

function Students() {
    // TODO: Funcionalidad del botón Añadir estudiante

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const columns = ['Nombre', 'Email', 'Teléfono']; //Consistency between columnName-dataKeyName

    useEffect(() => {
        async function fetchData() {
            try {
                // Get students
                const data_raw = await StudentService.GetStudentList();
                const new_data = data_raw.map(student => ({
                    // UserID: student.UserID,
                    // PersonID: student.PersonID,
                    Nombre: student.Name,
                    Email: student.Email,
                    Telefono: student.PhoneNumber,
                    // Foto: student.Photo
                }))

                setData(new_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
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

    const handleButtonAdd = () => {
        alert(`BotónADD`);
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={1}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.tableTitle}>Lista de estudiantes</h1>

                {loading && (
                    <div className='text-center my-5'>
                        <Loading size={15} />
                    </div>
                )}


                {
                    data.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={data}
                        buttons={btn}
                        mainButton='Añadir Estudiante'
                        mainButtonClick={handleButtonAdd}
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
                            { title: "Nombre", content: modalData.Nombre },
                            { title: "Email", content: modalData.Email },
                            // { title: "Curso", content: modalData.Email },
                            { title: "Teléfono", content: modalData.Telefono },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default Students;

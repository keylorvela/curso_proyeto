import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';

import NoInformationFound from 'src/components/NoInformationFound.jsx';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import StudentService from 'src/services/Students.service';
import GroupService from 'src/services/Group.service';

function StudentsByProf() {
    // TODO: Obtener el id del grupo
    const { state } = useLocation();
    const groupID = state?.groupID || 4;

    const [groupInformation, setGroupInformation] = useState({});
    const [studentsList, setStudentsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const columns = ['Nombre', 'Email', 'Teléfono']; //Consistency between columnName-dataKeyName

    useEffect(() => {
        async function fetchData() {
            try {
                // Get students
                const studentList_data = await StudentService.GetStudentsFromGroup( groupID );
                if (studentList_data[0].o_status.includes("Error")) {
                    return;
                }
                const studentList_formatted = studentList_data.map(student => ({
                    Nombre: student.Name,
                    Email: student.Email,
                    Telefono: student.PhoneNumber,
                    UserID: student.UserID,
                    ID: student.PersonID,
                    // Foto: student.Photo
                    Foto: "https://i.ibb.co/8DcLrrH/profile-icon-design-free-vector.jpg"
                }))

                // Get group information
                const group_data = await GroupService.GetGroupInformation( groupID );

                setGroupInformation( group_data );
                setStudentsList( studentList_formatted );
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
                <h1 className={styles.tableTitle}>Lista de estudiantes</h1>

                {
                    (studentsList.length) ? (
                        <DynamicTable
                            columns={columns}
                            data={studentsList}
                            buttons={btn}
                            isSearching={true}
                            searchKey='Nombre'
                        />
                    ) : (
                        <NoInformationFound message={"No hay estudiantes registrados"} ></NoInformationFound>
                    )
                }

                {showModal && modalData && (
                    <TableModal
                        show={showModal}
                        onHide={handleModalClose}
                        title={modalData.Nombre}
                        photo={modalData.Foto}
                        roundedPhoto={true}
                        labels={[
                            { title: "Nombre", content: modalData.Nombre },
                            { title: "Email", content: modalData.Email },
                            { title: "Curso", content: groupInformation.Name },
                            { title: "Teléfono", content: modalData.Telefono },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default StudentsByProf;

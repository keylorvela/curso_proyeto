import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/CommonTable.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import CourseService from "src/services/Courses.service"

function Courses() {
    const columns = ['Curso'];
    const navegate = useNavigate ();
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get courses
                const data_raw = await CourseService.GetCourseList();
                const new_data = data_raw.map(course => ({
                    CourseName: course.Name,
                }))

                setData(new_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    const handleButtonEdit = (rowData) => {
        navegate('/admin/course/' + 1);
        /*navegate('/admin/course/' + 1, {
            state: {rowData}
            });*/
    };

    const handleButtonDetails = (rowData) => {
        setModalData(rowData);
        setShowModal(true);
    };


    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleButtonAdd = () => {
        navegate('/admin/course');
    };
    const btn = [
        { button: faPen, onButtonClick: handleButtonEdit },
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={1}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Cursos disponibles</h1>

                {
                    data.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={data}
                        buttons={btn}
                        mainButton='Añadir curso'
                        mainButtonClick={handleButtonAdd}
                    />
                }

                {showModal && modalData && (
                    <TableModal
                        show={showModal}
                        onHide={handleModalClose}
                        title="Curso"
                        photo="src/assets/stock2.jpg"
                        roundedPhoto={false}
                        labels={[
                            { title: "Curso", content: modalData.CourseName },
                            { title: "Grupo", content: modalData.CourseName },
                            { title: "Profesor", content: modalData.CourseName },
                            { title: "Horario", content: modalData.CourseName },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default Courses;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';
import TableModal from 'src/components/utils/TableModal.jsx';
import Loading from 'src/components/utils/Loading.jsx';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import CourseService from "src/services/Courses.service"
import GroupService from "src/services/Group.service"

function Courses() {
    const [loading, setLoading] = useState(true);

    const columns = ['Curso'];
    const navegate = useNavigate();
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
                    CourseID: course.ID,
                }))

                setData(new_data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    const handleButtonEdit = (rowData) => {
        navegate(`/admin/course/${rowData.CourseID}`);
        /*navegate('/admin/course/' + 1, {
            state: {rowData}
            });*/
    };

    const handleButtonDetails = async (rowData) => {
        try {
            // Get all groups in the course
            const groupList = await GroupService.GetGroupsInACourse(rowData.CourseID);
            const groupInformation = await GroupService.GetGroupInformation(groupList[0].GroupID);

            setModalData(groupInformation);
        } catch (error) {
            console.error("Error al obtener los detalles del curso/grupo", error);
            setModalData({
                Name: rowData.CourseName,
                GroupID: rowData.CourseName,
                TeacherName: rowData.CourseName,
                ScheduleDate: rowData.CourseName,
                ScheduleHour: rowData.CourseName
            });
        }

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

                <h1 className={styles.tableTitle}>Cursos disponibles</h1>

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
                            { title: "Curso", content: modalData.Name },
                            { title: "Grupo", content: modalData.GroupID },
                            { title: "Profesor", content: modalData.TeacherName },
                            { title: "Horario", content: `${modalData.ScheduleDate} - ${modalData.ScheduleHour}` },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default Courses;

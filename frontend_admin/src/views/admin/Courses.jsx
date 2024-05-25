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
                    Description: course.Description,
                    Topics: course.Topics || "No hay temas definidos",
                    Includes: course.Includes || "No hay detalles definidos",
                    Duration: course.Duration,
                    Price: course.Price,
                    UserTarget: course.UserTarget || "No hay público objetivo definido",
                    CourseImage: course.CourseImage || "https://i.ibb.co/wS2c1nt/Default-Image.jpg",
                    GroupsByCourse: course.GroupsByCourse || "No hay grupos asignados",
                    PayLink: course.PayLink
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


    const handleButtonEdit = (courseInformation) => {
        navegate(`/admin/course/${courseInformation.CourseID}`, {
            state: {courseInformation}
        });
    };

    const handleButtonDetails = async (rowData) => {
        setModalData({
            CourseName: rowData.CourseName,
            Duration: rowData.Duration,
            Price: rowData.Price,
            UserTarget: rowData.UserTarget,
            Groups: rowData.GroupsByCourse.replace(/,/g, '\n'),
            CourseImage: rowData.CourseImage
        })
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

    const formatCurrency = (value) => {
        return Intl.NumberFormat('es-CR', {
            style: "currency",
            currency: "CRC"
        }).format(value);
    }

    return (
        <MainLayout type={1}>

            <Container fluid>

                <h1 className={styles.tableTitle}>Cursos disponibles</h1>

                {loading && (
                    <div className='text-center my-5 position-absolute w-100'>
                            <Loading size={11} />
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
                        photo={modalData.CourseImage}
                        roundedPhoto={false}
                        labels={[
                            { title: "Curso", content: modalData.CourseName },
                            { title: "Duración", content: modalData.Duration },
                            { title: "Precio", content: formatCurrency( modalData.Price ) },
                            { title: "Público objetivo", content: modalData.UserTarget },
                            { title: "Grupos", content: modalData.Groups },
                        ]}
                    />
                )}

            </Container>
        </MainLayout>
    );
}

export default Courses;

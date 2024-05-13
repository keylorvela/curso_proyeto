import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/admin/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'

import CourseService from "src/services/Courses.service"
import GroupService from "src/services/Group.service"


function ManageCourse() {
    // TODO: Agregar los campos para crear/modificar un curso
    // TODO: API Calls para crear y modificar un curso
    // TODO: Funcionalidad de eliminar curso

    const { id } = useParams();
    const [hide, setHide] = useState(false);

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    const [courseInfo, setCourseInfo] = useState({});
    const [groupInfo, setGroupInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                // Get course information
                let courseName = "";
                let courseDescription = "";
                let coursePrice = "";
                let courseStartingDate = "";
                let courseCapacity = "";

                if (id) {
                    const courseData = await CourseService.GetCourseInfo(id);
                    const groupData = await GroupService.GetGroupList(id);

                    courseName = courseData.Name;
                    courseDescription = courseData.Description.replace(/\//g, '\n');
                    coursePrice = courseData.Price;
                    courseStartingDate = ( groupData.length ) ? groupData[0].StartingDate.split('T')[0] : "";
                    courseCapacity = ( groupData.length ) ? groupData[0].Capacity : "";
                }
                setCourseInfo({
                    name: courseName,
                    description: courseDescription,
                    price: coursePrice,
                    date: courseStartingDate,
                    capacity: courseCapacity
                });

                setGroupInfo({
                    startingDate: courseStartingDate,
                    capacity: courseCapacity
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const fields = [
        {
            id: 'name',
            label: 'Nombre del curso:',
            type: 'text',
            placeholder: 'Ingresa el nombre del curso',
            required: true,
        },
        {
            id: 'description',
            label: 'Descripción del curso:',
            type: 'textarea',
            placeholder: 'Ingresa la descripción del curso',
            required: true,
            rows: 6
        },
        {
            id: 'price',
            label: 'Coste:',
            type: 'number',
            placeholder: 'Costo del curso',
            required: true,
        },
        {
            id: 'date',
            label: 'Fecha de inicio:',
            type: 'date',
            placeholder: 'Ingresa la fecha de inicio del curso',
            required: true
        },
        {
            id: 'capacity',
            label: 'Capacidad:',
            type: 'number',
            placeholder: 'Capacidad del grupo',
            required: true,
        }
    ];

    const handleModal = (state) => {
        setHide(state);
    };

    const handleFormSubmit = (formValues) => {
        // Si no tiene id := Crear curso
        // Si no := Modificar curso
    };

    const handleDelete = async (courseID) => {
        try {
            // await CourseService.DeleteCourse( courseID );
            alert("Se elimino el curso");
        } catch (error) {
            console.error("Error al eliminar el cursos", error);
        }
    }

    const buttons = [
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
        { variant: 'primary', type: 'button', label: 'Asignar grupo',
        onClick: () => handleModal(true), },
    ]
    if (id) {
        buttons.push(
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar curso',
                onClick: (id) => handleDelete(id),
                parameter:id
            }
        )
    }

    return (
        <MainLayout type={1}>

            {/*Modal fro group may be refactored for BaseModal*/}
            <GroupModal hide={hide}
                handleState={handleModal}
                groupInfo={groupInfo}
                setGroupInfo={setGroupInfo}
            />

            <div className={styles.page}>
                <Container>

                    <Row>

                        <Col className='mt-2' xs={12} md={4}>
                            <Image src={img} fluid rounded />
                        </Col>

                        {/*filler*/}
                        <Col md={1}>
                            </Col>

                        <Col className='mt-2' xs={12} md={7}>
                            {
                                Object.keys(courseInfo).length !== 0
                                &&
                                Object.keys(groupInfo).length !== 0
                                &&
                                <DynamicForm
                                    fields={fields}
                                    onSubmit={handleFormSubmit}
                                    buttons={buttons}
                                    initialValues={courseInfo}
                                />
                            }
                        </Col>

                    </Row>
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageCourse;
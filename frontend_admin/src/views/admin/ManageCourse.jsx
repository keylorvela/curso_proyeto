import React, { useEffect, useState } from 'react';
import { useLocation  } from 'react-router-dom';
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

    const location = useLocation();
    const { id } = useParams();
    const [hide, setHide] = useState(false);

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    const [courseInfo, setCourseInfo] = useState({});
    const [groupInfo, setGroupInfo] = useState({});

    const courseInformation = location.state?.courseInformation;

    useEffect(() => {
        async function fetchData() {
            try {
                // Get course information
                let courseName = "";
                let courseDescription = "";
                let coursePrice = "";
                let courseDuration = "";
                let courseIncludes = "";
                let courseTopics = "";
                let courseUserTarget = "";
                let courseStartingDate = "";
                let courseCapacity = "";

                if (id) {
                    // const groupData = await GroupService.GetGroupList(id);

                    courseName = courseInformation.CourseName;
                    courseDescription = courseInformation.Description.replace(/\//g, '\n');
                    coursePrice = courseInformation.Price;
                    courseDuration = courseInformation.Duration || "";
                    courseIncludes = courseInformation.Includes.replace(/\//g, '\n') || "";
                    courseTopics = courseInformation.Topics.replace(/\//g, '\n') || "";
                    courseUserTarget = courseInformation.UserTarget.replace(/\//g, '\n') || "";
                    // courseStartingDate = ( groupData.length ) ? groupData[0].StartingDate.split('T')[0] : "";
                    // courseCapacity = ( groupData.length ) ? groupData[0].Capacity : "";
                }
                setCourseInfo({
                    Name: courseName,
                    Description: courseDescription,
                    Duration: courseDuration,
                    Includes: courseIncludes,
                    Topics: courseTopics,
                    UserTarget: courseUserTarget,
                    Price: coursePrice
                    // date: courseStartingDate,
                    // capacity: courseCapacity
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
            id: 'Name',
            label: 'Nombre del curso:',
            type: 'text',
            placeholder: 'Ingresa el nombre del curso',
            required: true,
        },
        {
            id: 'Description',
            label: 'Descripción del curso:',
            type: 'textarea',
            placeholder: 'Ingresa la descripción del curso',
            required: true,
            rows: 3
        },
        {
            id: 'Topics',
            label: 'Temas del curso:',
            type: 'textarea',
            placeholder: 'Ingresa los temas curso',
            required: false,
            rows: 4
        },
        {
            id: 'Includes',
            label: 'Incluye:',
            type: 'textarea',
            placeholder: 'Ingresa qué incluye el curso',
            required: false,
            rows: 4
        },
        {
            id: 'Duration',
            label: 'Duración',
            type: 'text',
            placeholder: 'Ingresa la duración del curso, ex: 5 semanas',
            required: true,
        },
        {
            id: 'Price',
            label: 'Coste:',
            type: 'number',
            placeholder: 'Costo del curso',
            required: true,
        },
        {
            id: 'UserTarget',
            label: 'Público objetivo:',
            type: 'text',
            placeholder: 'Ingresa el público objetivo del curso',
            required: false
        },
    ];

    const handleModal = (state) => {
        setHide(state);
    };
    const handleFormSubmit = async (formValues) => {
        // Format string := Change break line for '/'
        formValues.Description = formValues.Description.replace(/(\r\n|\n|\r)/g, "/");
        formValues.Topics = formValues.Topics.replace(/(\r\n|\n|\r)/g, "/");
        formValues.Includes = formValues.Includes.replace(/(\r\n|\n|\r)/g, "/");
        formValues.UserTarget = formValues.UserTarget.replace(/(\r\n|\n|\r)/g, "/");

        // Si no tiene id := Crear curso
        if (!id) {
            await CourseService.CreateCourse(
                formValues.Name,
                formValues.Description,
                formValues.Topics,
                formValues.Includes,
                formValues.Duration,
                formValues.Price,
                [],
                formValues.UserTarget
            );
            alert("Curso creado!");
        }
        else {
            await CourseService.UpdateCourse(
                id,
                formValues.Name,
                formValues.Description,
                formValues.Topics,
                formValues.Includes,
                formValues.Duration,
                formValues.Price,
                [],
                formValues.UserTarget
            );
            alert("Curso modificado!");
        }
        // Si no := Modificar curso
    };

    const handleDelete = async () => {
        try {
            if (id) {
                await CourseService.DeleteCourse( id );
                alert("Se elimino el curso");
            }
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
import React, { useEffect, useState, useRef } from 'react';
import { useLocation  } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/admin/AdminPage.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col, Image } from 'react-bootstrap'

import CourseService from "src/services/Courses.service"
import GroupService from "src/services/Group.service"


function ManageCourse() {
    // TODO: Agregar los campos para crear/modificar un curso
    // TODO: API Calls para crear y modificar un curso
    // TODO: Funcionalidad de eliminar curso

    const fileInputRef = useRef();
    const location = useLocation();
    const { id } = useParams();
    const [hide, setHide] = useState(false);
    const [profilePictureURL, setProfilePictureURL] = useState("");

    const [courseInfo, setCourseInfo] = useState({});
    const [groupInfo, setGroupInfo] = useState(
        {
            Teacher: 0,
            StartingDate: "",
            ScheduleDate: "",
            ScheduleHour: "",
            Capacity: 0
        }
    );

    const courseInformation = location.state?.courseInformation;

    useEffect(() => {
        async function fetchData() {
            try {
                // Get course information
                if (id) {
                    // const groupData = await GroupService.GetGroupList(id);
                }

                const courseName = courseInformation?.CourseName || "";
                const courseDescription = courseInformation?.Description.replace(/\//g, '\n') || "";
                const coursePrice = courseInformation?.Price || "";
                const courseDuration = courseInformation?.Duration || "";
                const courseIncludes = courseInformation?.Includes.replace(/\//g, '\n') || "";
                const courseTopics = courseInformation?.Topics.replace(/\//g, '\n') || "";
                const courseUserTarget = courseInformation?.UserTarget.replace(/\//g, '\n') || "";
                const courseImage = courseInformation?.CourseImage || "https://i.ibb.co/wS2c1nt/Default-Image.jpg";

                setProfilePictureURL(courseImage);

                setCourseInfo({
                    Name: courseName,
                    Description: courseDescription,
                    Duration: courseDuration,
                    Includes: courseIncludes,
                    Topics: courseTopics,
                    UserTarget: courseUserTarget,
                    Price: coursePrice,
                    CourseImage: courseImage
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
                profilePictureURL,
                formValues.UserTarget
            );
            alert("Curso creado!");
        }
        // Si no := Modificar curso
        else {
            await CourseService.UpdateCourse(
                id,
                formValues.Name,
                formValues.Description,
                formValues.Topics,
                formValues.Includes,
                formValues.Duration,
                formValues.Price,
                profilePictureURL,
                formValues.UserTarget
            );
            alert("Curso modificado!");
        }
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result;
                setProfilePictureURL(base64String);
            }

            reader.readAsDataURL(file);
        }
    }

    const buttons = [
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' }
    ]
    if (id) {
        buttons.push(
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar curso',
                onClick: (id) => handleDelete(id),
                parameter:id
            },
            {
                variant: 'primary',
                type: 'button',
                label: 'Asignar grupo',
                onClick: () => handleModal(true),
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
                courseID={id}
            />

            <div className={styles.page}>
                <Container>

                    <Row>
                        <Col className='mt-2' xs={12} md={4}>
                            {
                                Object.keys(courseInfo).length
                                &&
                                <div className={styles.image_container}>
                                    <Image src={profilePictureURL} fluid rounded />
                                    <span className={styles.edit_picture_span} onClick={() => { fileInputRef.current.click(); }}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </span>
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                                </div>
                            }
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
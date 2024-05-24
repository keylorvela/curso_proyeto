import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import AlertModal from 'src/components/utils/AlertModal.jsx'
import YesNoModal from 'src/components/utils/YesNoModal.jsx'

import Loading from 'src/components/utils/Loading.jsx'
import styles from 'src/views/admin/AdminPage.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col, Image } from 'react-bootstrap'

import CourseService from "src/services/Courses.service"
import ImageService from 'src/services/Image.service.js'


function ManageCourse() {
    // TODO: Agregar los campos para crear/modificar un curso
    // TODO: API Calls para crear y modificar un curso
    // TODO: Funcionalidad de eliminar curso

    const fileInputRef = useRef();
    const location = useLocation();
    const { id } = useParams();
    const navegate = useNavigate();

    const [hide, setHide] = useState(false);
    const [isModifyGroup, setIsModifyGroup] = useState(false);
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [loading, setLoading] = useState(true);

    // Modals control
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertCourse, setShowAlertCourse] = useState(false);
    const [showAlertDeleteCourse, setShowDeleteCourse] = useState(false);

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
                    //const groupData = await CourseService.GetCourseInfo(id);
                }

                const payLink = courseInformation?.PayLink || "";
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
                    CourseImage: courseImage,
                    PayLink: payLink
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
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
            label: 'Costo:',
            type: 'number',
            placeholder: 'Costo del curso',
            required: true,
        },
        {
            id: 'PayLink',
            label: 'Link de pago:',
            type: 'text',
            placeholder: 'Ingrese la url para el pago en linea',
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

    const handleModal = (state,isModifyGroup) => {
        setIsModifyGroup(isModifyGroup);
        setHide(state);
    };

    const uploadImage = async () => {
        try {
            if (profilePictureURL) {
                const data = await ImageService.uploadImage(profilePictureURL);
                setProfilePictureURL(data.data.image.url);
                return data.data.image.url;
            }

        } catch (error) {
            console.error("ERROR: Upload Failed ", error);
        }
    }

    const handleFormSubmit = async (formValues) => {
        // Format string := Change break line for '/'
        try {
            setLoading(true);
            const v_Description = formValues.Description.replace(/(\r\n|\n|\r)/g, "/");
            const v_Topics = formValues.Topics.replace(/(\r\n|\n|\r)/g, "/");
            const v_Includes = formValues.Includes.replace(/(\r\n|\n|\r)/g, "/");
            const v_UserTarget = formValues.UserTarget.replace(/(\r\n|\n|\r)/g, "/");
            let imgPromise = null;
            let imageURL = profilePictureURL;

            if (profilePictureURL !== "https://i.ibb.co/wS2c1nt/Default-Image.jpg") {
                imgPromise = uploadImage();
                await imgPromise.then(url => {
                    imageURL = url;
                });
            }

            // Si no tiene id := Crear curso
            if (!id) {
                await CourseService.CreateCourse(
                    formValues.Name,
                    v_Description,
                    v_Topics,
                    v_Includes,
                    formValues.Duration,
                    formValues.Price,
                    imageURL,
                    v_UserTarget,
                    formValues.PayLink
                );
                setAlertMessage("El curso se creo correctamente.");
            }
            // Si no := Modificar curso
            else {
                await CourseService.UpdateCourse(
                    id,
                    formValues.Name,
                    v_Description,
                    v_Topics,
                    v_Includes,
                    formValues.Duration,
                    formValues.Price,
                    imageURL,
                    v_UserTarget,
                    formValues.PayLink
                );
                setAlertMessage("El curso se modifico correctamente.");
            }
            setShowAlertCourse(true);
        } catch (error) {
            console.error("Error al editar o agregar el cursos", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            if (id) {
                await CourseService.DeleteCourse(id);

                setShowDeleteCourse(false);
                navegate("/admin/courses");
            }
        } catch (error) {
            console.error("Error al eliminar el cursos", error);
        } finally {
            setLoading(false);
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
                variant: 'primary',
                type: 'button',
                label: 'Asignar grupo',
                onClick: () => handleModal(true,false),
            },
            {
                variant: 'secondary',
                type: 'button',
                label: 'Modificar grupos',
                onClick: () => handleModal(true,true),
            },
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar curso',
                onClick: () => setShowDeleteCourse(true),
                parameter: id
            },
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
                isModify={isModifyGroup}
            />
            <AlertModal
                type="light"
                title="Información"
                message={alertMessage}
                showAlert={showAlertCourse}
                setShowAlert={setShowAlertCourse}
            />
            <YesNoModal
                question={"¿Estás seguro que deseas continuar con esta acción?"}
                message={"Se eliminará el curso permanentemente."}
                showAlert={showAlertDeleteCourse}
                setShowAlert={setShowDeleteCourse}
                handleYes={handleDelete}
            />


            {loading && (
                        <div className='text-center my-5'>
                            <Loading size={11} />
                        </div>
                    )}

            <div className={styles.page}>
                <Container fluid>

                    <Row className='d-flex flex-wrap'>
                        <Col className='mt-2 flex-grow-1 d-flex justify-content-center' sm={12} lg={5}>
                            {
                                Object.keys(courseInfo).length
                                &&
                                <div className={styles.image_container}>
                                    <Image src={profilePictureURL} className={styles.ProfilePicture} fluid rounded />
                                    <span className={styles.edit_picture_span} onClick={() => { fileInputRef.current.click(); }}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </span>
                                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                                </div>
                            }
                        </Col>

                        <Col className='mt-2 flex-grow-1' sm={12} lg={7}>
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
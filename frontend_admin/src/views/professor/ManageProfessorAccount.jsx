import { React, useState, useEffect, useRef } from 'react';

import PasswordModal from 'src/components/PasswordModal.jsx'
import AlertModal from 'src/components/utils/AlertModal.jsx'

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/views/professor/ProfessorPage.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col, Image } from 'react-bootstrap'
import TeachersService from 'src/services/Teachers.service';
import useAuth from 'src/components/utils/AuthContext.jsx';
function ManageProfessorAccount() {
    // TODO: Obtener el userID
    // TODO: Cargar la imagen de perfil
    const { getUser } = useAuth();
    const fileInputRef = useRef();
    const [loading, setLoading] = useState(false);

    const [showAlertUpdateInfo, setShowAlertUpdateInfo] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [passInfo, setPassInfo] = useState({});
    const [hide, setHide] = useState(false);
    const [teacherInformation, setTeacherInformation] = useState({});

    const [profilePictureURL, setProfilePictureURL] = useState("https://i.ibb.co/8DcLrrH/profile-icon-design-free-vector.jpg");

    useEffect(() => {
        async function fetchData() {
            try {
                // Get teacher information
                setLoading(true);
                const teacher_data = await TeachersService.GetTeacherInformation(getUser().ID );
                if(teacher_data.Photo)setProfilePictureURL(teacher_data.Photo);
                setTeacherInformation({
                    personID: teacher_data.PersonId,
                    name: teacher_data.Name,
                    photo: teacher_data.Photo,
                    phoneNumber: teacher_data.PhoneNumber,
                    email: teacher_data.Email,
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const fields = [
        {
            id: 'name',
            label: 'Nombre:',
            type: 'text',
            placeholder: 'Ingresa tu nombre',
            required: true,
        },
        {
            id: 'phoneNumber',
            label: 'Teléfono:',
            type: 'text',
            placeholder: 'Ingresa tu número de teléfono',
            required: true,
        },
        {
            id: 'email',
            label: 'Correo:',
            type: 'email',
            placeholder: 'Ingresa tu correo electrónico',
            required: true,
        }
    ];

    const handleModal = (state) => {
        setHide(state);
    };

    const handleFormSubmit = async (formValues) => {
        try {
            setLoading(true);
            await TeachersService.UpdateTeacherInformation(
                formValues.personID,
                formValues.name,
                formValues.phoneNumber,
                formValues.email,
                formValues.photo
            );
            setAlertMessage("Se actualizaron los datos exitosamente");
            setShowAlertUpdateInfo(true);
        } catch (error) {
            console.error("Error in update teacher information", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result;

                setProfilePictureURL(base64String);
                setTeacherInformation({
                    ...teacherInformation, photo: base64String
                });
            }

            reader.readAsDataURL(file);
        }
    }

    const handleChangePassword = () => {
        setHide(true);
    }

    const buttons = [
        {
            variant: 'primary', type: 'button', label: 'Cambiar contraseña',
            onClick: () => handleChangePassword()
        },
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
    ]

    return (
        <MainLayout type={2}>
            {/*Modal use example*/}
            <PasswordModal hide={hide}
                handleState={handleModal}
                passInfo={passInfo}
                setPassInfo={setPassInfo}
                userID={getUser().ID }
            />
            <AlertModal
                type="light"
                title="Información"
                message={alertMessage}
                showAlert={showAlertUpdateInfo}
                setShowAlert={setShowAlertUpdateInfo}
            />

            <div className={styles.page}>
                <Container fluid>
                    {loading && (
                        <div className='text-center my-5 position-absolute w-100'>
                            <Loading size={11} />
                        </div>
                    )}
                    <Row className='d-flex flex-wrap'>

                        <Col className='mt-2 flex-grow-1 d-flex justify-content-center' sm={12} lg={5}>
                            {
                                Object.keys(teacherInformation).length
                                &&
                                <div className={styles.image_container}>
                                    <Image src={profilePictureURL} className={styles.ProfilePicture} fluid rounded />
                                    <span className={styles.edit_picture_span} onClick={() => { fileInputRef.current.click(); }}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </span>
                                    <input type="file"accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                                </div>
                            }
                        </Col>

                        <Col className='mt-2 flex-grow-1' sm={12} lg={7}>
                            {
                                Object.keys(teacherInformation).length
                                &&
                                <DynamicForm
                                    fields={fields}
                                    onSubmit={handleFormSubmit}
                                    buttons={buttons}
                                    initialValues={teacherInformation}
                                />
                            }
                        </Col>

                    </Row>
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageProfessorAccount;
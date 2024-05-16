import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';


import PasswordModal from 'src/components/PasswordModal.jsx'


import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/views/professor/ProfessorPage.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col, Image } from 'react-bootstrap'
import TeachersService from 'src/services/Teachers.service';

function ManageProfessorAccount() {
    // TODO: Obtener el userID
    // TODO: Cargar la imagen de perfil
    const userID = 7;
    const fileInputRef = useRef();
    const [loading, setLoading] = useState(false);

    const [passInfo, setPassInfo] = useState({});
    const [hide, setHide] = useState(false);
    const [teacherInformation, setTeacherInformation] = useState({});

    const [profilePictureURL, setProfilePictureURL] = useState("https://i.ibb.co/8DcLrrH/profile-icon-design-free-vector.jpg");

    useEffect(() => {
        async function fetchData() {
            try {
                // Get teacher information
                setLoading(true);
                const teacher_data = await TeachersService.GetTeacherInformation(userID);
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
            alert("Modificación de info del profesor exitosa!");
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
                userID={userID}
            />

            <div className={styles.page}>
                <Container>
                    {loading && (
                        <div className='text-center my-5'>
                            <Loading size={11} />
                        </div>
                    )}
                    <Row>

                        <Col className='mt-2' xs={12} md={4}>
                            {
                                Object.keys(teacherInformation).length
                                &&
                                <div className={styles.image_container}>
                                    <Image src={profilePictureURL} fluid rounded />
                                    <span className={styles.edit_picture_span} onClick={() => { fileInputRef.current.click(); }}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </span>
                                    <input type="file"accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                                </div>
                            }
                        </Col>

                        {/*filler*/}
                        <Col md={1}>
                        </Col>

                        <Col className='mt-2' xs={12} md={7}>
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
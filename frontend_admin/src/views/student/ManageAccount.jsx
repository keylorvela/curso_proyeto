import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import PasswordModal from 'src/components/PasswordModal.jsx'

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import Loading from 'src/components/utils/Loading.jsx';
import styles from 'src/views/student/StudentPage.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import StudentService from 'src/services/Students.service';

function ManageAccount() {
    // TODO: Obtener el userID
    // TODO: Display user profile picture
    const userID = 8;

    const fileInputRef = useRef();
    const [loading, setLoading] = useState(false);
    const [passInfo, setPassInfo] = useState({});
    const [hide, setHide] = useState(false);
    const [studentInformation, setStudentInformation] = useState({});

    const [profilePictureURL, setProfilePictureURL] = useState("https://i.ibb.co/8DcLrrH/profile-icon-design-free-vector.jpg");

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                // Get student information
                const student_data = await StudentService.GetStudentsInformation(userID);
                if(student_data.Photo)setProfilePictureURL(student_data.Photo);
                setStudentInformation({
                    userID: student_data.UserId,
                    personID: student_data.PersonId,
                    photo: student_data.Photo,
                    name: student_data.Name,
                    phoneNumber: student_data.PhoneNumber,
                    email: student_data.Email,
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
            console.log(studentInformation.photo);
            setLoading(true);
            const result = await StudentService.UpdateStudentInformation(
                formValues.personID,
                formValues.name,
                formValues.phoneNumber,
                formValues.email,
                studentInformation.photo
            );
            alert("Modificación de info del estudiante exitosa!");
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
                setStudentInformation({
                    ...studentInformation, photo: base64String
                });
            }

            reader.readAsDataURL(file);
        }
    }

    const handleChangePassword = () => {
        //Debería recuperarse de la sesión
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
        <MainLayout type={3}>
            {/*Modal use example*/}
            <PasswordModal hide={hide}
                handleState={handleModal}
                passInfo={passInfo}
                setPassInfo={setPassInfo}
                userID={userID}
            />

            <div className={styles.page}>
                <Container fluid>
                    {loading && (
                        <div className='text-center my-5'>
                            <Loading size={11} />
                        </div>
                    )}
                    <Row className='d-flex flex-wrap' >
                        <Col className='mt-2 flex-grow-1 d-flex justify-content-center' sm={12} lg={5}>
                            {
                                Object.keys(studentInformation).length
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
                                Object.keys(studentInformation).length
                                &&
                                <DynamicForm
                                    fields={fields}
                                    onSubmit={handleFormSubmit}
                                    buttons={buttons}
                                    initialValues={studentInformation}
                                />
                            }
                        </Col>

                    </Row>
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageAccount;
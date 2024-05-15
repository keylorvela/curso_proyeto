import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import PasswordModal from 'src/components/PasswordModal.jsx'


import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/professor/ProfessorPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'
import TeachersService from 'src/services/Teachers.service';

function ManageProfessorAccount() {
    // TODO: Obtener el userID
    // TODO: Funcionalidad del cambio de contraseña
    const userID = 5;

    const [passInfo, setPassInfo] = useState({});
    const [hide, setHide] = useState(false);
    const [teacherInformation, setTeacherInformation] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                // Get teacher information
                const teacher_data = await TeachersService.GetTeacherInformation( userID );

                setTeacherInformation({
                    personID: teacher_data.PersonId,
                    name: teacher_data.Name,
                    photo: teacher_data.Photo,
                    phoneNumber: teacher_data.PhoneNumber,
                    email: teacher_data.Email,
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
        }
    };

    const handleChangePassword = () => {
        //Debería recuperarse de la sesión
        // ---> await UserService.ChangePassword(userID, oldPassword, newPassword);

        setHide(true);
    }

    const buttons = [
        { variant: 'primary', type: 'button', label: 'Cambiar contraseña',
        onClick: () => handleChangePassword()},
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

                    <Row>

                        <Col className='mt-2' xs={12} md={4}>
                            <Image src={img} fluid rounded />
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
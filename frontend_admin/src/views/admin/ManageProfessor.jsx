
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate  } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import noImage from 'src/assets/noImage.jpg'
import styles from 'src/views/admin/AdminPage.module.css'
import Loading from 'src/components/utils/Loading.jsx';

import { Container, Row, Col, Image } from 'react-bootstrap'

import TeachersService from 'src/services/Teachers.service';
import UserService from 'src/services/User.service';
import { PasswordManager } from '../util/PasswordManager';

function ManageProfessor() {
    //TODO Fetch teacherInformation from backend
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navegate = useNavigate ();

    const teacherData = location.state?.teacherInformation;
    const [teacherInformation, setTeacherInformation] = useState({});
    const defaultPhoto = "https://i.ibb.co/8DcLrrH/profile-icon-design-free-vector.jpg";

    const passwordManager = new PasswordManager();

    useEffect(() => {
        async function fetchData() {
            try {
                let teacher_PersonID = teacherData?.PersonID || "";
                let teacher_Name = teacherData?.Nombre || "";
                let teacher_Photo = (teacherData?.Foto === 'null' || !id) ? defaultPhoto : teacherData?.Foto;
                let teacher_PhoneNumber = teacherData?.Telefono || "";
                let teacher_Email = teacherData?.Email || "";
                setTeacherInformation({
                    personID: teacher_PersonID,
                    name: teacher_Name,
                    photo: teacher_Photo,
                    phoneNumber: teacher_PhoneNumber,
                    email: teacher_Email,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleFormSubmit = async (formValues) => {
        try {
            // Sí hay id := Modifica el profesor
            setLoading(true);
            if (id) {
                await TeachersService.UpdateTeacherInformation(
                    formValues.personID,
                    formValues.name,
                    formValues.phoneNumber,
                    formValues.email,
                    formValues.photo
                );
                alert("Modificación de info del profesor exitosa!");
            }
            // Si no := Crea el profesor
            else {
                const tempPassword = passwordManager.generatePassword();
                const request = await UserService.RegisterUser(
                    formValues.name,
                    formValues.email,
                    formValues.phoneNumber,
                    null,
                    formValues.email,
                    tempPassword,
                    "Profesor"
                );
                if(request.o_status === 'Error: Failed insertion')
                    alert("Hay un profesor con ese numero o correo")
                else alert("Profesor creado")
            }
        } catch (error) {
            console.error("Error in update teacher information", error);
        } finally {
            setLoading(false);
        }
    };


    const fields = [
        {
            id: 'name',
            label: 'Nombre del profesor:',
            type: 'text',
            placeholder: 'Ingresa el nombre del profesor',
            required: true,
        },
        {
            id: 'phoneNumber',
            label: 'Número telefónico del profesor:',
            type: 'text',
            placeholder: 'Ingresa el teléfono del profesor',
            required: true,
        },
        {
            id: 'email',
            label: 'Email del profesor:',
            type: 'email',
            placeholder: 'Ingresa el correo electrónica del profesor',
            required: true,
        }
    ];

    const handleDeleteTeacher = async (id_p) => {
        try {
            const numID = Number( id_p );
            const result = await TeachersService.DeleteTeacher( numID );

            if (result.o_status.includes("Error")) {
                alert(`No se elimino el profesor: ${result.o_status}`)
                return;
            }

            alert("Se elimino el profesor (Actualizar API del profesor)");
            navegate('/admin/professors');
        } catch (error) {
            console.error("Error al eliminar profesor", error);
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
                label: 'Eliminar profesor',
                onClick: (id) => handleDeleteTeacher(id),
                parameter: id
            }
        )
    }

    return (
        <MainLayout type={1}>

            <div className={styles.page}>
                <Container fluid>
                    {loading && (
                        <div className='text-center my-5'>
                            <Loading size={11} />
                        </div>
                    )}
                    <Row className='d-flex flex-wrap'>
                        <Col className='mt-2 flex-grow-1 d-flex justify-content-center' sm={12} lg={5}>
                            <div className={styles.image_container}>
                                <Image src={teacherInformation.photo} className={styles.ProfilePicture} fluid rounded/>
                            </div>
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

export default ManageProfessor;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/admin/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'

import TeachersService from 'src/services/Teachers.service';


function ManageProfessor() {
    //TODO Fetch teacherInformation from backend
    const { id } = useParams();

    const [teacherInformation, setTeacherInformation] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                let teacher_PersonID = '';
                let teacher_Name = '';
                let teacher_Photo = '';
                let teacher_PhoneNumber = '';
                let teacher_Email = '';

                if (id) {
                    // Get teacher information
                    const teacher_data = await TeachersService.GetTeacherInformation(id);

                    teacher_PersonID = teacher_data.PersonId;
                    teacher_Name = teacher_data.Name;
                    teacher_Photo = teacher_data.Photo;
                    teacher_PhoneNumber = teacher_data.PhoneNumber;
                    teacher_Email = teacher_data.Email;
                }

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


    const fields = [
        {
            id: 'name',
            label: 'Nombre del profesor:',
            type: 'text',
            placeholder: 'Ingresa el nombre del profesor',
            required: true,
        },
        // {
        //     id: 'id_prof',
        //     label: 'Identificación:',
        //     type: 'text',
        //     placeholder: 'Ingresa la identificación del profesor',
        //     required: true,
        // },
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

    const handleDelete = (id_p) => {
        alert(id_p);
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
                onClick: (id) => handleDelete(id),
                parameter: id
            }
        )
    }

    return (
        <MainLayout type = {1}>

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

export default ManageProfessor;
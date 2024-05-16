
import React, { useEffect, useState } from 'react';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import noImage from 'src/assets/noImage.jpg'
import styles from 'src/views/admin/AdminPage.module.css'
import Loading from 'src/components/utils/Loading.jsx';

import { Container, Row, Col, Image } from 'react-bootstrap'

import StudentService from 'src/services/Students.service';
import UserService from 'src/services/User.service';
import GroupService from 'src/services/Group.service';
import CourseService from "src/services/Courses.service"

function ManageStudent() {
    const [loading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get courses
                const data_raw = await CourseService.GetCourseList();
                const new_data = data_raw.map(course => ({
                    label: course.Name,
                    value: course.ID,
                }))
                setCourseList(new_data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleFormSubmit = async (formValues) => {
        try {
            setLoading(true);
            await UserService.RegisterUser(
                formValues.name,
                formValues.email,
                formValues.phoneNumber,
                null,
                formValues.email,
                "1234",
                "Estudiante"
            );
            const data_raw = await StudentService.GetStudentList();
            const userId = data_raw[data_raw.length - 1].UserID;

            const response = await StudentService.RegisterStudentInGroup(formValues.group,userId);
            if(response.status === 200){
                alert("Estudiante agregado")
            }

        } catch (error) {
            console.error("Error adding student", error);
        } finally {
            setLoading(false);
        }
    };
    const getGrupsbyCourse = async (idCourse) => {
        try {
            const groupData = await GroupService.GetGroupList(idCourse);
            const new_data_group = groupData.map(group => ({
                label: group.ScheduleDate +' '+ group.ScheduleHour,
                value: group.GroupID,
            }))
            setGroupList(new_data_group);

        } catch (error) {
            console.error("Error getting groups", error);
        }
    };


    const fields = [
        {
            id: 'name',
            label: 'Nombre del estudiante:',
            type: 'text',
            placeholder: 'Ingresa el nombre del estudiante',
            required: true,
        },
        {
            id: 'phoneNumber',
            label: 'Número telefónico del estudiante:',
            type: 'text',
            placeholder: 'Ingresa el teléfono del estudiante',
            required: true,
        },
        {
            id: 'email',
            label: 'Email del estudiante:',
            type: 'email',
            placeholder: 'Ingresa el correo electrónica del estudiante',
            required: true,
        },
        {
            id: 'course',
            label: 'Curso',
            type: 'select',
            placeholder: 'Selecciona el curos',
            options: courseList,
            required: true,
        },
        {
            id: 'group',
            label: 'Grupo',
            type: 'select',
            placeholder: 'Selecciona el grupo',
            options: groupList,
            required: true,
        }
    ];

    const buttons = [
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' }
    ]

    return (
        <MainLayout type={1}>

            <div className={styles.page}>
                <Container>
                    {loading && (
                        <div className='text-center my-5'>
                            <Loading size={11} />
                        </div>
                    )}
                    <Row>

                        <Col className='mt-2' md={12} lg={5}>
                            <Image src={noImage} fluid rounded />
                        </Col>

                        <Col className='mt-2' md={12} lg={7}>
                            {
                                <DynamicForm
                                    fields={fields}
                                    onSubmit={handleFormSubmit}
                                    buttons={buttons}
                                    initialValues={{}}
                                    onChangeSelect={getGrupsbyCourse}

                                />
                            }
                        </Col>

                    </Row>
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageStudent;
import React, { useEffect, useState } from 'react';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import AlertModal from 'src/components/utils/AlertModal.jsx'

import noImage from 'src/assets/noImage.jpg'
import styles from 'src/views/admin/AdminPage.module.css'
import Loading from 'src/components/utils/Loading.jsx';

import { Container, Row, Col, Image } from 'react-bootstrap'

import StudentService from 'src/services/Students.service';
import UserService from 'src/services/User.service';
import GroupService from 'src/services/Group.service';
import CourseService from "src/services/Courses.service"

import { PasswordManager } from '../util/PasswordManager';

function ManageStudent() {
    const [loading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    // Modals control
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertStudent, setShowAlertStudent] = useState(false);

    const passwordManager = new PasswordManager();

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
            const tempPassword = passwordManager.generatePassword();
            await UserService.RegisterUser(
                formValues.name,
                formValues.email,
                formValues.phoneNumber,
                null,
                formValues.email,
                tempPassword,
                "Estudiante"
            );
            const data_raw = await StudentService.GetStudentList();
            const userId = data_raw[data_raw.length - 1].UserID;

            const response = await StudentService.RegisterStudentInGroup(formValues.group,userId);
            if(response.status === 200){
                setAlertMessage("El estudiante se registro correctamente");
                setShowAlertStudent(true);
            }

        } catch (error) {
            console.error("Error adding student", error);
        } finally {
            setLoading(false);
        }
    };
    const getGroupsByCourse = async (idCourse) => {
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
            placeholder: 'Selecciona el curso',
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
            <AlertModal
                type="light"
                title="Información"
                message={alertMessage}
                showAlert={showAlertStudent}
                setShowAlert={setShowAlertStudent}
            />

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
                                <Image src={noImage} className={styles.ProfilePicture} fluid rounded />
                            </div>
                        </Col>

                        <Col className='mt-2 flex-grow-1' sm={12} lg={7}>
                            {
                                <DynamicForm
                                    fields={fields}
                                    onSubmit={handleFormSubmit}
                                    buttons={buttons}
                                    initialValues={{}}
                                    onChangeSelect={getGroupsByCourse}

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
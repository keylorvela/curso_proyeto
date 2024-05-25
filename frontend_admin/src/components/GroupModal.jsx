import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from 'src/components/Common.module.css'

import AlertModal from 'src/components/utils/AlertModal.jsx'

import TeachersService from "src/services/Teachers.service"
import GroupService from "src/services/Group.service"

function GroupModal({ hide, handleState, groupInfo, setGroupInfo, courseID, isModify }) {
    //TODO Fetch professors
    const [teachersList, setTeachersList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [groupID, setGroupID] = useState();
    const [selectedDays, setSelectedDays] = useState({
        Lunes: false,
        Martes: false,
        Miércoles: false,
        Jueves: false,
        Viernes: false,
        Sábado: false,
        Domingo: false,
    });

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertGroup, setShowAlertGroup] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const teacherList_data = await TeachersService.GetTeachersList();
                setTeachersList(teacherList_data);

                if (isModify) {
                    const groupData = await GroupService.GetGroupList(courseID);
                    const new_data_group = groupData.map(group => ({
                        label: group.ScheduleDate + ' ' + group.ScheduleHour,
                        value: group.GroupID,
                    }))
                    setGroupList(new_data_group);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [isModify]);

    // Update selected days object
    const handleCheckBoxChange = (day) => {
        setSelectedDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }))
    }

    const handleGroupChange = async (e) => {
        const groupID = e.target.value;
        setGroupID(groupID);

        const groupData = await GroupService.GetGroupInformation(groupID);
        const new_data_group = {
            Teacher: groupData.UserID,
            StartingDate: groupInfo.StartingDate,
            ScheduleDate: groupData.ScheduleDate,
            ScheduleHour: groupData.ScheduleHour,
            Capacity: groupInfo.Capacity
        }
        setGroupInfo(new_data_group);

    };

    const handleChange = (e, fieldName) => {
        const inputData = e.target.value;
        setGroupInfo({ ...groupInfo, [fieldName]: (inputData != "-1") ? inputData : "" });
    };

    const handleClose = () => handleState(false);

    const handleAddGroup = async (event) => {
        event.preventDefault(); 
        const ScheduleDate = Object.keys(selectedDays).filter(day => selectedDays[day]).join('/');
        if (ScheduleDate == "") {
            setAlertMessage("Debe seleccionar una fecha.");
            setShowAlertGroup(true);
            return;
        }
        setGroupInfo({ ...groupInfo, ["ScheduleDate"]: ScheduleDate });


        try {
            if (isModify) {
                await GroupService.UpdateGroup(
                    groupInfo.StartingDate,
                    ScheduleDate,
                    groupInfo.ScheduleHour,
                    groupInfo.Capacity,
                    groupID,
                    groupInfo.Teacher
                );
                setAlertMessage("Se modifico el grupo correctamente.");
            }
            else {
                await GroupService.CreateGroup(
                    groupInfo.StartingDate,
                    ScheduleDate,
                    groupInfo.ScheduleHour,
                    groupInfo.Capacity,
                    courseID,
                    groupInfo.Teacher
                );
                setAlertMessage("Se agrego el grupo al curso correctamente.");
            }
            setShowAlertGroup(true);
        } catch (error) {
            console.error("Error al asignar grupo al curso:", error);
        } finally {
            handleState(false);
        }
    }

    return (
        <>
            <AlertModal
                type="light"
                title="Información"
                message={alertMessage}
                showAlert={showAlertGroup}
                setShowAlert={setShowAlertGroup}
            />

            <Modal show={hide} onHide={handleClose} animation={false} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.label}>Definir grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className='px-3' onSubmit={handleAddGroup}>
                        {isModify && (
                            <Form.Group className='mb-3'>
                                <Form.Label className={`fs-5 ${styles.label}`} >Grupos:</Form.Label>
                                <Form.Select aria-label="Selecciona un grupo" onChange={(e) => handleGroupChange(e)} required>
                                    <option key="" value="">Seleccionar un grupo</option>
                                    {
                                        groupList.map((group) => (
                                            <option key={group.value} value={group.value}>{group.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        )}
                        <Form.Group className='mb-3'>
                            <Form.Label className={`fs-5 ${styles.label}`} >Profesor:</Form.Label>
                            <Form.Select aria-label="Selecciona un profesor" onChange={(e) => handleChange(e, 'Teacher')} required>
                                <option
                                    key=""
                                    value=""
                                >
                                    Seleccionar un profesor
                                </option>
                                {
                                    teachersList.map((teacher) => (
                                        <option key={teacher.UserID} value={teacher.UserID}>{teacher.Name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label className={`fs-5 ${styles.label}`}>Selecciona la fecha de inicio:</Form.Label>
                            <Form.Control
                                type="date"
                                value={groupInfo.StartingDate}
                                onChange={(e) => handleChange(e, 'StartingDate')}
                                required
                            />
                        </Form.Group>

                        <Form.Label className={`fs-5 ${styles.label}`} >Elige los días:</Form.Label>
                        <Form.Group className={'text-center mb-3'}>
                            {Object.keys(selectedDays).map((day, index) => (
                                <Form.Check key={index}
                                    inline
                                    label={day}
                                    name={day}
                                    type={'checkbox'}
                                    id={index}
                                    checked={selectedDays[day]}
                                    onChange={() => handleCheckBoxChange(day)}
                                />
                            ))}
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="timeInput">
                            <Form.Label className={`fs-5 ${styles.label}`}>Selecciona una hora:</Form.Label>
                            <Form.Control
                                type="time"
                                value={groupInfo.ScheduleHour}
                                onChange={(e) => handleChange(e, 'ScheduleHour')}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label className={`fs-5 ${styles.label}`}>Ingrese el total de cupos disponibles:</Form.Label>
                            <Form.Control
                                type="number"
                                value={groupInfo.Capacity}
                                onChange={(e) => handleChange(e, 'Capacity')}
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                {isModify ? 'Modificar grupo' : 'Agregar grupo'}
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default GroupModal;
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from 'src/components/Common.module.css'

import TeachersService from "src/services/Teachers.service"
import GroupService from "src/services/Group.service"

function GroupModal({ hide, handleState, groupInfo, setGroupInfo, courseID }) {
    //TODO Fetch professors
    const [teachersList, setTeachersList] = useState([]);
    const [selectedDays, setSelectedDays] = useState({
        Lunes: false,
        Martes: false,
        Miércoles: false,
        Jueves: false,
        Viernes: false,
        Sábado: false,
        Domingo: false,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const teacherList_data = await TeachersService.GetTeachersList();
                setTeachersList( teacherList_data );
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    // Update selected days object
    const handleCheckBoxChange = (day) => {
        setSelectedDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }))
    }

    const handleChange = (e, fieldName) => {
        const inputData = e.target.value;
        setGroupInfo({ ...groupInfo, [fieldName]: (inputData != "-1") ? inputData : "" });
    };

    const handleClose = () => handleState(false);

    const handleAddGroup = async () => {
        const ScheduleDate = Object.keys(selectedDays).filter(day => selectedDays[day]).join('/');
        if (ScheduleDate == "") {
            alert("No hay fechas seleccionadas")
            return;
        }
        setGroupInfo({ ...groupInfo, ["ScheduleDate"]: ScheduleDate });

        try {
            await GroupService.CreateGroup(
                groupInfo.StartingDate,
                ScheduleDate,
                groupInfo.ScheduleHour,
                groupInfo.Capacity,
                courseID,
                groupInfo.Teacher
            );
            alert(`Se asigno un grupo al curso ${courseID}`);
        } catch (error) {
            console.error("Error al asignar grupo al curso:", error);
        } finally {
            handleState(false);
        }
    }

    return (
        <>
            <Modal show={hide} onHide={handleClose} animation={false} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.label}>Definir grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className = 'px-3'>
                        <Form.Group className='mb-3'>
                            <Form.Label className={`fs-5 ${styles.label}`} >Profesor:</Form.Label>
                            <Form.Select aria-label="Selecciona un profesor" onChange={(e) => handleChange(e, 'Teacher')}>
                                <option key="-1" value="-1">Seleccionar un profesor</option>
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
                                onChange={(e) => handleChange(e, 'StartingDate') }
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
                                onChange={(e) => handleChange(e, 'ScheduleHour') }
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label className={`fs-5 ${styles.label}`}>Ingrese el total de cupos disponibles:</Form.Label>
                            <Form.Control
                                type="number"
                                value={groupInfo.Capacity}
                                onChange={(e) => handleChange(e, 'Capacity') }
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Guardar
                    </Button> */}
                    <Button variant="primary" onClick={handleAddGroup}>
                        Agregar grupo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default GroupModal;
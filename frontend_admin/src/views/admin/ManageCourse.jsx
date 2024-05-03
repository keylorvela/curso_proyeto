
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/admin/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'


function ManageCourse() {
    //TODO Fetch values from backend

    const [groupInfo, setGroupInfo] = useState({});

    const { id } = useParams();
    const [hide, setHide] = useState(false);

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    let values = {};
    if (id) {
        values = { name: 'name1', description: 'des1', price: '99' }
    }



    const handleModal = (state) => {
        setHide(state);
    };

    const handleFormSubmit = (formValues) => {
        console.log(formValues)
    };


    const fields = [
        {
            id: 'name',
            label: 'Nombre del curso:',
            type: 'text',
            placeholder: 'Ingresa el nombre del curso',
            required: true,
        },
        {
            id: 'description',
            label: 'Descripción del curso:',
            type: 'textarea',
            placeholder: 'Ingresa la descripción del curso',
            required: true,
            rows: 6
        },
        {
            id: 'price',
            label: 'Coste:',
            type: 'number',
            placeholder: 'Costo del curso',
            required: true,
        },
        {
            id: 'date',
            label: 'Fecha de inicio:',
            type: 'date',
            placeholder: 'Ingresa la fecha de inicio del curso',
            required: true
        },
        {
            id: 'capacity',
            label: 'Capacidad:',
            type: 'number',
            placeholder: 'Capacidad del grupo',
            required: true,
        }
    ];
    const handleDelete = (id_p) => {
        alert( id_p);
    }

    const buttons = [
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
        { variant: 'primary', type: 'button', label: 'Asignar grupo', 
        onClick: () => handleModal(true), },
                                    
    ]
    if (id) {
        buttons.push(
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar curso',
                onClick: (id) => handleDelete(id),
                parameter:id
            }
        )
    }

    return (
        <MainLayout>
            {/*Modal use example*/}
            <GroupModal hide={hide}
                handleState={handleModal}
                groupInfo={groupInfo}
                setGroupInfo={setGroupInfo}
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
                            <DynamicForm
                                fields={fields}
                                onSubmit={handleFormSubmit}
                                buttons={buttons}
                                initialValues={values}


                            />
                        </Col>

                    </Row>
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageCourse;
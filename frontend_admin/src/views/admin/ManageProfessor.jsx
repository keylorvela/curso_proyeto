
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/admin/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'


function ManageProfessor() {
    //TODO Fetch values from backend
    const { id } = useParams();

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    let values = {};
    if (id) {
        values = { name: 'name1', description: 'des1', id_prof: '99' }
    }


    const handleFormSubmit = (formValues) => {
        console.log(formValues)
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
            id: 'id_prof',
            label: 'Identificación:',
            type: 'text',
            placeholder: 'Ingresa la identificación del profesor',
            required: true,
        },
        {
            id: 'phone',
            label: 'Número telefónico del profesor:',
            type: 'text',
            placeholder: 'Ingresa el teléfono del profesor',
            required: true,
        },
        {
            id: 'mail',
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
        <MainLayout>

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
                                buttons={[
                                    { variant: 'primary', type: 'submit', label: 'Guardar cambios' }

                                ]}
                                initialValues={values}


                            />
                        </Col>

                    </Row>
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageProfessor;
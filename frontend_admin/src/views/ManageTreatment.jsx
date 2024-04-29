
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'


function ManageTreatment() {
    //TODO Fetch values from backend
    const { id } = useParams();

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    let values = {};
    if (id) {
        values = { name: 'name1', description: 'des1', id_prof: '99' }
    }


    const handleDelete = (id_p) => {
        alert( id_p);
    }
    
    const handleFormSubmit = (formValues) => {
        console.log(formValues)
    };


    const fields = [
        {
            id: 'name',
            label: 'Nombre del tratamiento:',
            type: 'text',
            placeholder: 'Ingresa el nombre del tratamiento',
            required: true,
        },
        {
            id: 'description',
            label: 'Descripción:',
            type: 'textarea',
            placeholder: 'Ingresa la descripción del tratamiento',
            required: true,
            rows: 6
        },
        {
            id: 'price',
            label: 'Coste:',
            type: 'number',
            placeholder: 'Costo del tratamiento',
            required: true,
        },
        {
            id: 'categoria',
            label: 'Categoría',
            type: 'select',
            placeholder: 'Selecciona la categoría',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
            required: true,
        }
    ];

    const buttons = [
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' }
    ]
    if (id) {
        buttons.push(
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar tratamiento',
                onClick: (id) => handleDelete(id),
                parameter:id
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

export default ManageTreatment;
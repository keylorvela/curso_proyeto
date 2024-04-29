
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import Loading from 'src/components/utils/Loading.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'

import tServ from 'src/services/Treatments.service.js'


function ManageTreatment() {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);


    const { id } = useParams() || null;


    //  A possible use
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await tServ.getTreatment(id);
                setValues(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    const handleDelete = (id_p) => {
        alert(id_p);
    }

    const handleFormSubmit = (formValues) => {
        alert(JSON.stringify(formValues))
    };




    const fields = [
        {
            id: 'Name',
            label: 'Nombre del tratamiento:',
            type: 'text',
            placeholder: 'Ingresa el nombre del tratamiento',
            required: true,
        },
        {
            id: 'Description',
            label: 'Descripción:',
            type: 'textarea',
            placeholder: 'Ingresa la descripción del tratamiento',
            required: true,
            rows: 6
        },
        {
            id: 'Price',
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

    

    const buttons = []
    if (id) {
        buttons.push(
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar tratamiento',
                onClick: (id) => handleDelete(id),
                parameter: id
            }
        )
    }


    //Always at the end
    buttons.push({ variant: 'primary', type: 'submit', label: 'Guardar cambios' });
   

    return (
        <MainLayout>

            <div className={styles.page}>
                <Container>

                    {loading ? (
                        <div className='text-center'>
                            <Loading size={15} />
                        </div>
                    ) : (
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
                    )}I
                    
                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageTreatment;
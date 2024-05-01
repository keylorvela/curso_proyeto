import { useParams } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/ManageCourse.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'


function ManageCourse() {
    const { id } = useParams();

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    let values = {};
    if (id) {
        values = { name: 'name1', description: 'des1', price: '99' }
    }



    const handleDelete = () => {
        console.log("hi")
    };
    const handleFormSubmit = (formValues) => {
        console.log(formValues)
    };



    //Sólo por el ejemplo
    const fields2 = [
        {
            id: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name',
            required: true,
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            required: true,
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            required: true,
        },
        {
            id: 'bio',
            label: 'Bio',
            type: 'textarea',
            placeholder: 'Enter your bio',
            required: false,
            rows: 4
        },
        {
            id: 'age',
            label: 'Edad',
            type: 'number', // Especifica el tipo como 'number' para validar números
            placeholder: 'Ingresa tu edad',
            required: true
        },
        {
            id: 'date',
            label: 'Fecha',
            type: 'date', // Especifica el tipo como 'number' para validar números
            placeholder: 'Ingresa tu fecha de nacimiento',
            required: true
        },
        {
            id: 'gender',
            label: 'Gender',
            type: 'select',
            placeholder: 'Select your gender',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
            required: true,
        },
    ];

    return (
        <MainLayout>
            <div className={styles.page}>


                <Container>

                    <Row>
                        <Col xs={12} md={6}>
                            <Image src={img} fluid />
                        </Col>

                        <Col xs={12} md={6}>
                            <DynamicForm
                                fields={fields2}
                                onSubmit={handleFormSubmit}
                                buttons={[
                                    { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
                                    { variant: 'danger', type: 'button', label: 'Eliminar', onClick: handleDelete },
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

export default ManageCourse;
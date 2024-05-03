
import { useState } from 'react';
import { useParams } from 'react-router-dom';


import PasswordModal from 'src/components/PasswordModal.jsx'


import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import GroupModal from 'src/components/GroupModal.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/professor/ProfessorPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'


function ManageProfessorAccount() {
    //TODO Fetch info related to this user


    

    const [passInfo, setPassInfo] = useState({});

    const [hide, setHide] = useState(false);

    //Aquí debería solicitar info del id de curso
    //Esta pagina sirve para agregar o modificar
    let values = {};
   

    const handleModal = (state) => {
        setHide(state);
    };

    const handleFormSubmit = (formValues) => {
        console.log(formValues)
    };


    const fields = [
        {
            id: 'name',
            label: 'Nombre:',
            type: 'text',
            placeholder: 'Ingresa tu nombre',
            required: true,
        },
        {
            id: 'phone',
            label: 'Teléfono:',
            type: 'text',
            placeholder: 'Ingresa tu número de teléfono',
            required: true,
        },
        {
            id: 'email',
            label: 'Correo:',
            type: 'email',
            placeholder: 'Ingresa tu correo electrónico',
            required: true,
        }

    ];

    const handleChangePassword = () => {
        //Debería recuperarse de la sesión
        setHide(true);
    }

    const buttons = [
        { variant: 'primary', type: 'button', label: 'Cambiar contraseña', 
        onClick: () => handleChangePassword()},
        { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
                                    
    ]

    return (
        <MainLayout type={2}>
            {/*Modal use example*/}
            <PasswordModal hide={hide}
                handleState={handleModal}
                passInfo={passInfo}
                setPassInfo={setPassInfo}
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

export default ManageProfessorAccount;
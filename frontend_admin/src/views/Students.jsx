import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Students() {
    const columns = ['Nombre', 'Curso','Estado'];
    const data = [
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'María', Email: 'maria@example.com' },
        {ID: '284283749', Nombre: 'Pedro', Email: 'pedro@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
    ];

    const handleButtonDetails = (rowData) => {
        alert(`Botón2 clickeado para ${rowData.Email}`);
    };
    const handleButtonAdd = () => {
        alert(`Botón3`);
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Lista de estudiantes</h1>

                <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                    mainButton='Añadir Estudiante'
                    mainButtonClick={handleButtonAdd}
                />

            </Container>
        </MainLayout>
    );
}

export default Students;

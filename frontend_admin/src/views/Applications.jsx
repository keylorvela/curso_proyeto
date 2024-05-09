import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Applications() {
    const columns = ['ID','Nombre', 'Curso'];
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

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type = {1}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Solicitudes de matrícula</h1>

                <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                />

            </Container>
        </MainLayout>
    );
}

export default Applications;

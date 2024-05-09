import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faEye  } from '@fortawesome/free-solid-svg-icons';

function MyCourses() {
    const columns = ['Curso', ];
    const data = [
        {  Email: 'juan@example.com' },
        {  Email: 'maria@example.com' },
        {  Email: 'pedro@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
        {  Email: 'juan@example.com' },
    ];


    const handleButtonDetails = (rowData) => {
        alert(`Botón2 clickeado para ${rowData.Email}`);
    };

    const btn = [
        { button: faEye, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Mis Cursos</h1>

                <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                />

            </Container>
        </MainLayout>
    );
}

export default MyCourses;

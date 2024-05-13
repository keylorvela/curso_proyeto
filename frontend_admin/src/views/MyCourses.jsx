import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';

import Container from 'react-bootstrap/Container';
import { faEye  } from '@fortawesome/free-solid-svg-icons';

function MyCourses() {
    const columns = ['Curso', ];
    const data = [
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'maria@example.com' },
        {  CourseName: 'pedro@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
        {  CourseName: 'juan@example.com' },
    ];


    const handleButtonDetails = (rowData) => {
        alert(`Botón2 clickeado para ${rowData.Email}`);
    };

    const btn = [
        { button: faEye, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={3}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.tableTitle}>Mis Cursos</h1>

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

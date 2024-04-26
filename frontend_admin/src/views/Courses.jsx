import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Courses() {
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


    const handleButtonEdit = (rowData) => {
        alert(`Botón clickeado para ${rowData.Nombre}`);
    };

    const handleButtonDetails = (rowData) => {
        alert(`Botón2 clickeado para ${rowData.Email}`);
    };

    const handleButtonAdd = () => {
        alert(`Botón3`);
    };
    const btn = [
        { button: faPen, onButtonClick: handleButtonEdit },
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Cursos disponibles</h1>

                <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                    mainButton='Añadir curso'
                    mainButtonClick={handleButtonAdd}
                />

            </Container>
        </MainLayout>
    );
}

export default Courses;

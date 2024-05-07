import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Students() {
    const columns = ['Nombre', 'Curso','Estado']; //Consistency between columnName-dataKeyName
    const data = [
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '84283749', Nombre: 'María', Email: 'maria@example.com' },
        {ID: '4283749', Nombre: 'Pedro', Email: 'pedro@example.com' },
        {ID: '1284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Juan', Email: 'juan@example.com' },
        {ID: '8284283749', Nombre: 'Muan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Iuan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Tuan', Email: 'juan@example.com' },
        {ID: '984283749', Nombre: 'Zuan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Ruan', Email: 'juan@example.com' },
        {ID: '584283749', Nombre: 'Luan', Email: 'juan@example.com' },
        {ID: '284283749', Nombre: 'Suan', Email: 'juan@example.com' },
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
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Lista de estudiantes</h1>

                <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                    mainButton='Añadir Estudiante'
                    mainButtonClick={handleButtonAdd}
                    isSearching={true}
                    searchKey='Nombre'
                />

            </Container>
        </MainLayout>
    );
}

export default Students;

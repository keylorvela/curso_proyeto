import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function StudentsByProf() {
    const columns = ['Nombre', 'Email','Teléfono']; //Consistency between columnName-dataKeyName
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
                />

            </Container>
        </MainLayout>
    );
}

export default StudentsByProf;

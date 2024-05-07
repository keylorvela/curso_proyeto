import React from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Professors() {
    const columns = ['Nombre', 'Identificacion'];
    const data = [
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'María', Email: 'maria@example.com' },
        { Nombre: 'Pedro', Email: 'pedro@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
        { Nombre: 'Juan', Email: 'juan@example.com' },
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
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Profesores</h1>

                <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                    mainButton='Añadir Profesor'
                    mainButtonClick={handleButtonAdd}
                    isSearching={true}
                    searchKey='Nombre'
                />

            </Container>
        </MainLayout>
    );
}

export default Professors;

import React, { useEffect, useState } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import TeachersService from '../services/Teachers.service';

function Professors() {
    const columns = ['Nombre', 'Email'];
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get profesors list
                const data_raw = await TeachersService.GetTeachersList();
                const new_data = data_raw.map(teacher => ({
                    Nombre: teacher.Name,
                    Email: teacher.Email,
                }))

                setData(new_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

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

                {
                    data.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={data}
                        buttons={btn}
                        mainButton='Añadir Profesor'
                        mainButtonClick={handleButtonAdd}
                        isSearching={true}
                        searchKey='Nombre'
                    />
                }

            </Container>
        </MainLayout>
    );
}

export default Professors;

import React, { useEffect, useState } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import StudentService from '../services/Students.service';

function StudentsByProf() {
    const [data, setData] = useState([]);
    const columns = ['Nombre', 'Email', 'Teléfono']; //Consistency between columnName-dataKeyName

    useEffect(() => {
        async function fetchData() {
            try {
                // Get students
                const data_raw = await StudentService.GetStudentList();
                const new_data = data_raw.map(student => ({
                    ID: student.UserID,
                    Nombre: student.Name,
                    Email: student.Email
                }))

                setData(new_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleButtonDetails = (rowData) => {
        alert(`Botón2 clickeado para ${rowData.Email}`);
    };

    const btn = [
        { button: faCirclePlus, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={2}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Lista de estudiantes</h1>

                {
                    data.length
                    &&
                    <DynamicTable
                    columns={columns}
                    data={data}
                    buttons={btn}
                    isSearching={true}
                    searchKey='Nombre'
                />
                }

            </Container>
        </MainLayout>
    );
}

export default StudentsByProf;

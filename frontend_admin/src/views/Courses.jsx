import React, { useEffect, useState } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/views/Professors.module.css';

import Container from 'react-bootstrap/Container';
import { faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import CourseService from "../services/Courses.service"

function Courses() {
    const columns = ['Curso' ];
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get courses
                const data_raw = await CourseService.GetCourseList();
                const new_data = data_raw.map(course => ({
                    CourseName: course.Name,
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
        <MainLayout type={1}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Cursos disponibles</h1>

                {
                    data.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={data}
                        buttons={btn}
                        mainButton='Añadir curso'
                        mainButtonClick={handleButtonAdd}
                    />
                }

            </Container>
        </MainLayout>
    );
}

export default Courses;

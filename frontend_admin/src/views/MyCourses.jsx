import { React, useState, useEffect } from 'react';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';

import Container from 'react-bootstrap/Container';
import { faEye  } from '@fortawesome/free-solid-svg-icons';

import GroupService from 'src/services/Group.service';

function MyCourses() {
    // TODO: Obtener el id del usuario actual
    // TODO: Funcionalidad del boton de más detalles
    const userID = 5;

    const columns = ['Curso', ];
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const listGroups_data = await GroupService.GetEnrolledGroups( userID );
                const listGroups_formatted = [];

                for (const group of listGroups_data) {
                    listGroups_formatted.push({
                        CourseName: group.Name
                    });
                }

                setGroupList( listGroups_formatted );
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
        { button: faEye, onButtonClick: handleButtonDetails }
    ]


    return (
        <MainLayout type={3}>
            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.tableTitle}>Mis Cursos</h1>

                {
                    groupList.length
                    &&
                    <DynamicTable
                        columns={columns}
                        data={groupList}
                        buttons={btn}
                    />
                }

            </Container>
        </MainLayout>
    );
}

export default MyCourses;

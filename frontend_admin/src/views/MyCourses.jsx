import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';

import Container from 'react-bootstrap/Container';
import { faEye  } from '@fortawesome/free-solid-svg-icons';

import GroupService from 'src/services/Group.service';

function MyCourses() {
    // TODO: Obtener el id del usuario actual
    // TODO: Funcionalidad del boton de más detalles
    const userID = 6;

    const navigate = useNavigate();
    const location = useLocation(); // TODO: Arreglo temporal (Para distinguir entre student | professor)

    const columns = ['Curso', ];
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const listGroups_data = await GroupService.GetEnrolledGroups( userID );
                const listGroups_formatted = [];

                for (const group of listGroups_data) {
                    listGroups_formatted.push({
                        CourseName: group.Name,
                        CourseID: group.CourseID,
                        GroupID: group.GroupID,
                        Description: group.Description,
                        StartingDate: group.StartingDate,
                        ScheduleDate: group.ScheduleDate,
                        ScheduleHour: group.ScheduleHour
                    });
                }

                setGroupList( listGroups_formatted );
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    // Link to the group details
    const handleButtonDetails = (rowData) => {
        const groupID = rowData.GroupID;
        const mainRoute = location.pathname.split('/')[1];
        navigate(`/${mainRoute}/news`, { state: { userID, groupID } });
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

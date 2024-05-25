import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import DynamicTable from 'src/components/DynamicTable.jsx';
import MainLayout from 'src/components/MainLayout.jsx';
import styles from 'src/components/Common.module.css';

import NoInformationFound from 'src/components/NoInformationFound.jsx';

import Container from 'react-bootstrap/Container';
import { faEye  } from '@fortawesome/free-solid-svg-icons';

import GroupService from 'src/services/Group.service';

import useAuth from 'src/components/utils/AuthContext.jsx';

function MyCourses() {
    // TODO: Funcionalidad del boton de más detalles

    const { getUser } = useAuth();

    const navigate = useNavigate();
    const location = useLocation(); // TODO: Arreglo temporal (Para distinguir entre student | professor)

    const columns = ['Curso', ];
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {


                let listGroups_data = [];

                listGroups_data = (getUser().UserTypeID == 3) ? await GroupService.GetEnrolledGroups( getUser().ID ) : await GroupService.GetGroupsOfTeacher(  getUser().ID  );

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
        navigate(`/${mainRoute}/news`, { state: { groupID } });
    };

    const btn = [
        { button: faEye, onButtonClick: handleButtonDetails }
    ]

    return (
        <MainLayout type={getUser().UserTypeID}>
            <Container fluid>
                <h1 className={styles.tableTitle}>Mis Cursos</h1>

                {
                    (groupList.length) ? (
                        <DynamicTable
                            columns={columns}
                            data={groupList}
                            buttons={btn}
                        />
                    ) : (
                        <NoInformationFound message={"No hay cursos registrados"} ></NoInformationFound>
                    )
                }

            </Container>
        </MainLayout>
    );
}

export default MyCourses;

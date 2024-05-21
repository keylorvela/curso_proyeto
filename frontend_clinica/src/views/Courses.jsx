import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCourses } from 'src/services/coursesService.js';
import MainLayout from 'src/components/MainLayout.jsx';
import Treatment from 'src/components/Treatment.jsx';
import Loading from 'src/components/utils/Loading.jsx';
import ContentTable from 'src/components/ContentTable.jsx';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

import styles from 'src/views/Treatments.module.css';


function Courses() {
  const [courses, setCourses] = useState([]);


  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    //Para búsqueda manual
    setSearchTerm(event.target.value);
  };

  const handleClick = (id) => {
    navigate(`/course/${id}`);
  };
 
  const getFilters = () => (
    <Form>
      <Row className='d-flex align-items-center mb-5'>
        <Col>
          <Form.Group controlId="formTreatment">
            <Form.Label>Ingresa el nombre de un tratamiento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );

  const filteredCourses = courses.filter(course =>
    course.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.main}>

          
        </div>
        <div className={styles.treatments}>
          <ContentTable title="Cursos disponibles">
            
            {loading ? (
              <div className={styles.loading}>
                <Loading size={10} />
              </div>
            ) : (
              <>
                <Row>{getFilters()}</Row>
                <Row className={styles.cardsContainer}>
                  {filteredCourses.map((item, index) => (
                    <Col className = {styles.cardTreatment} key={index}>
                      <Treatment
                        title={item.Name}
                        image={item.CourseImage || "https://i.ibb.co/wS2c1nt/Default-Image.jpg"}
                        event={() => handleClick(item.ID)}
                      />
                    </Col>
                  ))}
                  {filteredCourses.length === 0 && (
                    <Alert key='warning' variant='warning'>
                      No se encontraron cursos.
                    </Alert>
                  )}
                </Row>
              </>
            )}

          </ContentTable>
        </div>
      </div>
    </MainLayout>
  );
}

export default Courses;

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getTreatments, getCategories } from 'src/services/treatmentsService.js';
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

function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Get all categories
        const data_categories = await getCategories();
        setCategories(data_categories)

        // Get all treatments
        const data = await getTreatments();
        setTreatments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (id) => {
    navigate(`/treatment/${id}`);
  };

  const handleCategoryFilter = async (e) => {
    let categoryID = parseInt( e.target.value );
    categoryID = (categoryID === 0) ? undefined : categoryID;

    setTreatments([]);
    const data = await getTreatments(categoryID);
    setTreatments(data);
  }

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
      <Row className='d-flex align-items-center mb-3'>
        <Stack direction="horizontal" gap={3}>
          <p className='fs-6'>Filtros disponibles:</p>
          <Form.Select aria-label="Default select example" onChange={(e) => handleCategoryFilter(e)}>
            <option key={0} value={0}>Todos</option>

            {categories.map(category => (
              <option key={category.ID} value={category.ID}>{category.CategoryName}</option>
            ))}

          </Form.Select>
        </Stack>
      </Row>
    </Form>
  );

  const filteredTreatments = treatments.filter(treatment =>
    treatment.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.main}>


        </div>
        <div className={styles.treatments}>
          <ContentTable title="Tratamientos disponibles">
            {loading ? (
              <div className={styles.loading}>
                <Loading size={10} />
              </div>
            ) : (
              <>
                <Row>{getFilters()}</Row>
                <Row className={styles.cardsContainer}>
                  {filteredTreatments.map((item, index) => (
                    <Col className={styles.cardTreatment} key={index}>
                      <Treatment
                        title={item.Name}
                        event={() => handleClick(item.ID)}
                      />
                    </Col>
                  ))}
                  {filteredTreatments.length === 0 && (
                    <Alert key='warning' variant='warning'>
                      No se encontraron tratamientos.
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

export default Treatments;

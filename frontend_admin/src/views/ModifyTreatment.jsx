import { React, useState, useEffect  } from 'react';
import { useLocation  } from 'react-router-dom';
import { Image, Form, Button, Col, Row,Alert  } from 'react-bootstrap';

import styles from 'src/views/ModifyTreatment.module.css';
import MainLayout from 'src/components/MainLayout.jsx';
import img from 'src/assets/stock2.jpg';
import TreatmentsService from 'src/services/Treatments.service.js'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function ModifyTreatment() {

    const [alertMessage, setAlertMessage] = useState(null);
    const location = useLocation();
    const initialTreatmentInfo = location.state?.treatmentInfo;
    let treatmentInfo = initialTreatmentInfo;

    const [name, setName] = useState(initialTreatmentInfo?.Name || '');
    const [description, setDescription] = useState(initialTreatmentInfo?.Description || '');
    const [price, setPrice] = useState(initialTreatmentInfo?.Price || '');

    const [imageUrl, setImageUrl] = useState(null);
    const categories = [
        { "id": 1, "name": "Category 1" },
        { "id": 2, "name": "Category 2" },
        { "id": 3, "name": "Category 3" }
    ]

    useEffect(() => {
        
        if (treatmentInfo != null){

            treatmentInfo.Name = name
            treatmentInfo.Description = description
            treatmentInfo.Price = price
        }
        
    }, [name,description,price]);

    /**
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      setCategories(categoriesData);
    }, []);
     */

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
    
          const request = await TreatmentsService.updateTreatment(treatmentInfo);
          if (request.status === 200) 
            setAlertMessage('Actualización exitosa');
        
          
        } catch (error) {
          console.error('Update fail:', error);
        }
    };    


    return (
        <MainLayout>
            {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
            <Row style={{ marginTop: '3%' }}>
                <Col md={4} style={{ position: 'relative', marginLeft: '4.5%' }}>
                    <Image src={imageUrl || img} fluid style={{ height: '80%' }} />
                    <input type="file" accept="image/*" style={{ display: 'none' }} id="fileInput" onChange={handleImageChange} />
                    <button className={`fw-bold ${styles.btn}`} onClick={handleButtonClick}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.5em' }} />
                    </button>
                </Col>
                <Col md={7}>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label className={styles.customLabel}>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" required style={{ backgroundColor: '#f2f2f2' }} value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label className={styles.customLabel}>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Descripcion" required style={{ backgroundColor: '#f2f2f2' }} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formCategory">
                            <Form.Label className={styles.customLabel}>Categoría</Form.Label>
                            <Form.Control as="select" required style={{ backgroundColor: '#f2f2f2' }}>
                                <option value="">Seleccionar Categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label className={styles.customLabel}>Precio</Form.Label>
                            <Form.Control type="number" placeholder="Precio" required style={{ backgroundColor: '#f2f2f2' }}value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className={styles.customButton}>
                            Guardar cambios
                        </Button>
                    </Form>
                </Col>
            </Row>
        </MainLayout>

    );
}

export default ModifyTreatment;

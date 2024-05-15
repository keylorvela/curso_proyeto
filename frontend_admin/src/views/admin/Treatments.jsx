import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import MainLayout from 'src/components/MainLayout.jsx';
import FeaturedTreatments from 'src/components/FeaturedTreatments.jsx';
import styles from 'src/views/admin/Treatments.module.css';
import BaseModal from 'src/components/utils/BaseModal.jsx';
import DynamicForm from 'src/components/DynamicForm.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function Treatments() {

    const [categories, setCategories] = useState([{ ID: 1, name: "categoria1" }, { ID: 2, name: "categoria2" }]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editedCategory, setEditedategory] = useState({});
    const [showTable, setShowTable] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/admin/treatment');
    };

    const fields = [
        {
            id: 'name',
            label: 'Nombre de categoría:',
            type: 'text',
            placeholder: 'Ingresa el nombre de categoría',
            required: true,
        },
    ];
    const buttons = [{ variant: 'primary', type: 'submit', label: 'Guardar cambios' }]

    const handleEditCategory = async (data) => {
        console.log(data);
        setModalShow(false);
        const updatedCategories = [...categories];
        updatedCategories.forEach(category => {
            if (category.ID === data.ID) {
                category.name = data.name;
            }
        });
        setCategories(updatedCategories);
    }

    const handleAddCategory = () => {
        if (newCategoryName.trim() !== '') {
            console.log(newCategoryName);
            setCategories([...categories, { ID: categories.length + 1, name: newCategoryName }]);
            setNewCategoryName('');
        }
    };

    const handleDeleteCategory = (index) => {
        console.log(index);
        const updatedCategories = categories.filter(category => category.ID !== index);
        setCategories(updatedCategories);
    };

    return (
        <MainLayout type={1}>

            <BaseModal
                pshow={modalShow}
                setShow={setModalShow}
            >
                <div className='px-3'>
                    <DynamicForm
                        fields={fields}
                        onSubmit={handleEditCategory}
                        buttons={buttons}
                        initialValues={editedCategory}
                    />
                </div>
            </BaseModal>


            <Container fluid style={{ width: '98%' }}>
                <h1 className={styles.title}>Tratamientos</h1>
            
                <div className={styles.horizontalLines}>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary"
                            className={styles.btnAdd}
                            onClick={handleRedirect}>
                            Añadir Tratamiento
                        </Button>
                    </div>
                </div>

                <FeaturedTreatments></FeaturedTreatments>


                {/* Category Section */}
                <div className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>Gestionar Categorías</h2>

                    <div className={styles.categoryAdd} >
                        <input
                            className={styles.input}
                            type="text" value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nueva categoría"
                        />
                        <Button className={styles.btn}
                            variant="outline-primary"
                            onClick={handleAddCategory}>
                            <FontAwesomeIcon icon={faPlus} />
                            Agregar
                        </Button>
                    </div>


                    <Button className={styles.btnHide} onClick={() => setShowTable(!showTable)}>
                        {showTable ? 'Ocultar categorías' : 'Mostrar categorías'}
                    </Button>
                    {showTable && (
                        <Table striped hover responsive borderless >
                            <thead>
                                <tr>
                                    <th>Categoría</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.name}</td>
                                        <td>
                                            <Button className={styles.btn}
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => {
                                                    setEditedategory(category);
                                                    setModalShow(true);
                                                }} >
                                                <FontAwesomeIcon icon={faEdit} />
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDeleteCategory(category.ID)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Container>
        </MainLayout>
    );
}

export default Treatments;

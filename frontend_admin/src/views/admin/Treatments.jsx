import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import MainLayout from 'src/components/MainLayout.jsx';
import FeaturedTreatments from 'src/components/FeaturedTreatments.jsx';
import styles from 'src/views/admin/Treatments.module.css';
import BaseModal from 'src/components/utils/BaseModal.jsx';
import DynamicForm from 'src/components/DynamicForm.jsx';
import CategoriesService from 'src/services/Categories.service';

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


    async function fetchData() {
        try {
            // Get all categories
            const data_categories = await CategoriesService.getCategories();
            setCategories(data_categories)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleAddTreatment = () => {
        navigate('/admin/treatment');
    };

    const fields = [
        {
            id: 'CategoryName',
            label: 'Nombre de categoría:',
            type: 'text',
            placeholder: 'Ingresa el nombre de categoría',
            required: true,
        },
    ];
    const buttons = [{ variant: 'primary', type: 'submit', label: 'Guardar cambios' }]

    const handleEditCategory = async (data) => {
        setModalShow(false);
        const updatedCategories = [...categories];
        updatedCategories.forEach(category => {
            if (category.ID === data.ID) {
                category.CategoryName = data.CategoryName;
            }
        });
        setCategories(updatedCategories);
    }

    const handleAddCategory = async () => {
        if (newCategoryName.trim() !== '') {
            try {
                await CategoriesService.createCategory(newCategoryName);
                fetchData();
                setNewCategoryName('');
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
            }
        }
    };

    const handleDeleteCategory = async (index) => {
        try {
            await CategoriesService.deleteCategory(index);
            const updatedCategories = categories.filter(category => category.ID !== index);
            setCategories(updatedCategories);
            setNewCategoryName('');
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }
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


            <Container fluid>
                <h1 className={styles.title}>Tratamientos</h1>

                <div className={styles.horizontalLines}>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary"
                            className={styles.btnAdd}
                            onClick={handleAddTreatment}>
                            Añadir Tratamiento
                        </Button>
                    </div>
                </div>

                {/* Category Section */}
                <div className='mx-2'>
                    <div className={styles.categorySection}>
                        <h2 className={styles.categoryTitle}>Gestionar Categorías</h2>

                        <div className={styles.categoryAdd} >
                            <input
                                className={`${styles.input} ${styles.inputAddCategory}`}
                                type="text" value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Nueva categoría"
                            />
                            <Button className={`${styles.btn} ${styles.btnAddCategory}`}
                                variant="outline-primary"
                                onClick={handleAddCategory}>
                                <FontAwesomeIcon icon={faPlus} />
                                Agregar categoría
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
                                            <td>{category.CategoryName}</td>
                                            <td className='text-end'>
                                                <Button className={`${styles.btn} my-1`}
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditedategory(category);
                                                        setModalShow(true);
                                                    }}
                                                    style={{ minWidth: "95px" }}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    Editar
                                                </Button>
                                                <Button variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteCategory(category.ID)}
                                                    className='ms-2 my-1'
                                                    style={{ minWidth: "95px" }}
                                                >
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

                    <FeaturedTreatments></FeaturedTreatments>
                </div>

            </Container>
        </MainLayout>
    );
}

export default Treatments;

import React from 'react';
import DynamicForm from 'src/components/DynamicForm.jsx';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function ModifyTest() {
    //formClassName={styles.customForm}
    const handleDelete = () => {
        console.log("hi")
    };
    const handleFormSubmit = (formValues) => {
        console.log(formValues)
    };
    const categories = [
        { "id": 1, "name": "Category 1" },
        { "id": 2, "name": "Category 2" },
        { "id": 3, "name": "Category 3" }
    ]

    const values = {name:'name1',description:'des1',price:'99'}
    return (
        <DynamicForm
            fields={[
                { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre',value:values.name, required: true },
                { id: 'description', label: 'Descripcion', type: 'textarea', as:'textarea', placeholder: 'Descripcion',value:values.description, required: true },
                { id: 'category', label: 'Categoría', type: 'select', placeholder: 'Seleccionar Categoría', required: true, options: categories.map(category => ({ value: category.id, label: category.name })) },
                { id: 'price', label: 'Precio', type: 'number', placeholder: 'Precio',value:values.price, required: true },
            ]}
            onSubmit={handleFormSubmit}
            buttons={[
                { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
                { variant: 'danger', type: 'button', label: 'Eliminar', onClick: handleDelete },
            ]}
            initialValues={values}
            
        />

    );
}

export default ModifyTest;

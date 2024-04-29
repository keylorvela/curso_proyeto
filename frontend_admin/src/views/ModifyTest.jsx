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
    const fields2 = [
        {
            id: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name',
            required: true,
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            required: true,
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            required: true,
        },
        {
            id: 'bio',
            label: 'Bio',
            type: 'number',
            placeholder: 'Enter your bio',
        },
        {
          id: 'gender',
          label: 'Gender',
          type: 'select',
          placeholder: 'Select your gender',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
          required: true,
        },
    ];

    const values = {};//{ name: 'name1', description: 'des1', price: '99' }
    return (
        <DynamicForm
            fields={fields2}
            onSubmit={handleFormSubmit}
            buttons={[
                { variant: 'primary', type: 'submit', label: 'Guardar cambios' },
                { variant: 'danger', type: 'button', label: 'Eliminar', onClick: handleDelete },
            ]}

        />

    );
}

export default ModifyTest;

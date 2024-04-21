import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


/*

const handleSubmit = (formData) => {
    console.log(formData);
    // Aquí puedes enviar los datos del formulario a tu servidor o realizar cualquier otra acción necesaria
  };

  const fields = [
    { name: 'name', label: 'Nombre', inputType: 'text' },
    { name: 'email', label: 'Correo electrónico', inputType: 'email' },
    { name: 'message', label: 'Mensaje', inputType: 'textarea' },
    {
      name: 'gender',
      label: 'Género',
      inputType: 'select',
      options: [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Femenino' }
      ],
    },
    // Puedes agregar más campos según tus necesidades
  ];


  <DynamicForm fields={fields} onSubmit={handleSubmit} />

  
*/



function DynamicForm({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] }); // Solo toma el primer archivo si es que se permite múltiples archivos
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Group key={field.name}>
          <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
          {field.inputType === 'text' && (
            <Form.Control
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.inputType === 'email' && (
            <Form.Control
              type="email"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.inputType === 'textarea' && (
            <Form.Control
              as="textarea"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.inputType === 'select' && (
            <Form.Control
              as="select"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          )}
          {field.inputType === 'file' && (
            <Form.File
              id={field.name}
              name={field.name}
              onChange={handleFileChange}
            />
          )}
        </Form.Group>
      ))}
      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default DynamicForm;

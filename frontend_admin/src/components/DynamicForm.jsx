import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from 'src/components/Common.module.css';

function DynamicForm({ fields, onSubmit, buttons = [], initialValues = {}, onChangeSelect }) {
  const [formData, setFormData] = useState(initialValues);
 
  useEffect(() => {
    if (!(Object.keys(initialValues).length === 0)) {
      setFormData(initialValues );
    }
  }, [initialValues]);

  const handleChange = (value, fieldName) => {
    setFormData({ ...formData, [fieldName]: value });
    if (fieldName === 'course' && onChangeSelect) 
      onChangeSelect(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Group key={field.id} controlId={`form${field.id}`} className='mb-4'>
          <Form.Label className={`fs-5 ${styles.label}`}>{field.label}</Form.Label>
          {field.type === 'select' ? (
            <Form.Control
              as="select"
              onChange={(e) => {handleChange(e.target.value, field.id);}}
              value={formData[field.id] || ''}
              required={field.required}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          ) : (
            <Form.Control
              as={field.type === 'textarea' ? 'textarea' : 'input'}
              type={field.type}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(e.target.value, field.id)}
              value={formData[field.id] || ''}
              required={field.required}
              rows={field.rows}
            />
          )}
        </Form.Group>
      ))}
      <div>
        {buttons.map((button, index) => (
          button.type !== 'submit' ? (
            <Button
              key={index}
              className='mx-2 my-2'
              variant={button.variant}
              type={button.type}
              onClick={() => button.onClick(button.parameter)}
            >
              {button.label}
            </Button>
          ) : (
            <div key={index} className='d-inline'>
              <Button
                className='mr-2 my-4'
                variant={button.variant}
                type={button.type}
              >
                {button.label}
              </Button>
            </div>
          )
        ))}

      </div>



    </Form>
  );
}

export default DynamicForm;

import { React, useState, useEffect  } from 'react';
import { Image, Form, Button, Col, Row,Alert  } from 'react-bootstrap';

function DynamicForm({ fields, onSubmit, buttons = [], formClassName,initialValues }) {
    const [formValues, setFormValues] = useState(initialValues);
  
    const handleChange = (e, fieldName) => {
      setFormValues({ ...formValues, [fieldName]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formValues);
    };
  
    return (
      <Form onSubmit={handleSubmit} className={formClassName}>
        {fields.map((field) => (
          <Form.Group key={field.id} controlId={`form${field.id}`}>
            <Form.Label>{field.label}</Form.Label>
            {field.type === 'select' ? (
              <Form.Control
                as="select"
                onChange={(e) => handleChange(e, field.id)}
                value={formValues[field.id] || ''}
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
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(e, field.id)}
                value={formValues[field.id] || field.value}
                required={field.required}
                as={field.as}
                rows={field.rows}
              />
            )}
          </Form.Group>
        ))}
        <div>
          {buttons.map((button, index) => (
            <Button key={index} variant={button.variant} type={button.type} onClick={button.onClick}>
              {button.label}
            </Button>
          ))}
        </div>
      </Form>
    );
  }

  export default DynamicForm;
  
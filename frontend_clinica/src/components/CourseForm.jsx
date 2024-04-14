import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CourseForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        horario: '',
        comprobante: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formVal = event.currentTarget;
        if (formVal.checkValidity() === false) {
            event.stopPropagation();
        } else {
            alert('¡El formulario se envió correctamente!');
            console.log(JSON.stringify(form));
            setForm({
                nombre: '',
                telefono: '',
                correo: '',
                horario: '',
                comprobante: null
            });
            setValidated(false);
        }

        setValidated(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <p className='fs-3 fw-semibold mt-5'>Ya pagaste? Inicia tu matrícula:</p>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Nombre completo:</Form.Label>
                    <Form.Control
                        required
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        type="text"
                        placeholder="John Doe"
                    />
                    <Form.Control.Feedback type="invalid">
                        Se requiere nombre
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom02">
                    <Form.Label>Número telefónico:</Form.Label>
                    <Form.Control
                        required
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        type="number"
                        placeholder="8989 8989"
                    />
                    <Form.Control.Feedback type="invalid">
                        Se requiere su número de teléfono
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                    <Form.Label>Correo electrónico:</Form.Label>
                    <Form.Control
                        required
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        type="email"
                        placeholder="example@mail.com"
                    />
                    <Form.Control.Feedback type="invalid">
                        Se requiere su correo electrónico
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom04">
                    <Form.Label>Horario:</Form.Label>
                    <Form.Control
                        required
                        name="horario"
                        value={form.horario}
                        onChange={handleChange}
                        as="select"
                        aria-label="Default select example"
                        defaultValue=""
                    >
                        <option value="">Selecciona un horario</option>
                        <option value="1">Horario 1</option>
                        <option value="2">Horario 2</option>
                        <option value="3">Horario 3</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Se requiere seleccionar un horario
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                    <Form.Label>Comprobante:</Form.Label>
                    <Form.Control
                        required
                        name="comprobante"
                        onChange={handleChange}
                        type="file"
                        placeholder="Elegir archivo..."
                    />
                    <Form.Control.Feedback type="invalid">
                        Se requiere un comprobante
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="text-center mb-3">
                <Col>
                    <Button className='btn-lg mx-5 px-5' type="submit">Enviar</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default CourseForm;

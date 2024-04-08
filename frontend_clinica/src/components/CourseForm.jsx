import { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const initialState = {
    nombre: '',
    telefono: '',
    correo: '',
    horario: '',
    comprobante: null

}

function CourseForm() {
    const [validated, setValidated] = useState(false);
    const [form, updateForm] = useReducer((prev, next) => ({
        ...prev, ...next
    }), { initialState });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formVal = event.currentTarget;
        if (formVal.checkValidity() === false) {
            event.stopPropagation();
        } else {
            alert('¡El formulario se envió correctamente!');
            console.log(JSON.stringify(form));
        }
        setValidated(true);
    };


    return (

        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <p className='fs-3 fw-semibold mt-5'>Ya pagaste? Inicia tu matricula:</p>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Nombre completo:</Form.Label>
                        <Form.Control
                            required
                            defaultValue={initialState.nombre}
                            onChange={(e) => { updateForm({ nombre: e.target.value }) }}
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
                            defaultValue={initialState.numero}
                            onChange={(e) => { updateForm({ numero: e.target.value }) }}
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
                            defaultValue={initialState.correo}
                            onChange={(e) => { updateForm({ correo: e.target.value }) }}
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
                            as="select"  // Cambiamos el tipo de campo a "select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="">Selecciona un horario</option> {/* Agregamos una opción predeterminada */}
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
                            defaultValue={initialState.correo}
                            onChange={(e) => { updateForm({ comprobante: e.target.value }) }}
                            type="file"
                            placeholder="Elegir archivo..."
                        />
                        <Form.Control.Feedback type="invalid">
                            Se requiere su correo electrónico
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="text-center mb-3">
                    <Col>
                    <Button className = 'btn-lg mx-5 px-5' type="submit">Enviar</Button>
                    </Col>
                </Row>
            </Form>

        </>
    );
}


export default CourseForm;
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import Logo from 'src/assets/LogoELS2.svg';
import styles from 'src/views/Login.module.css';


import UserService from 'src/services/User.service.js';
import useAuth from 'src/components/utils/AuthContext.jsx';
import AlertModal from 'src/components/utils/AlertModal.jsx';
import LoadModal from 'src/components/utils/LoadModal.jsx';

function Login() {

    const { login } = useAuth();
    const navegate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  //Feedback
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);







    const handleLogin = async (e) => {
        e.preventDefault();

        try {

<<<<<<< HEAD
      
      setShow(true);
      const userData = await UserService.login(email, password);

      if (userData.ID) {
        //log user in AuthContext
        login(userData);
        

        switch (userData.UserTypeID) {
          case 1: navegate('admin'); break;
          case 2: navegate('professor'); break;
          case 3: navegate('student'); break;
          default: navegate('');
        }

      } 
      else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Login fail:', error);
    }finally{
      setShow(false);
    }
  };

    return (
        <Container fluid className={styles.loginContainer}>
            <AlertModal
                type="danger"
                title="Error"
                message="Correo o contraseña equivocados"
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />

      <LoadModal pshow={show} setShow = {setShow}/>   


            <Row className="d-flex justify-content-center align-items-center vh-100">
                <Col md={6} className={styles.logoColumn}>
                    <img src={Logo} alt="Logo" className={styles.logo} />
                </Col>
                <Col md={6} className={`${styles.formColumn}`}>
                    <div className={styles.loginForm}>
                        <h2 className={styles.title}>Iniciar sesión</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formEmail">
                                <Form.Label style={{ marginTop: '5%', marginBottom: '4%' }}>Usuario</Form.Label>
                                <Form.Control type="text" required className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label style={{ marginTop: '5%', marginBottom: '4%' }}>Contraseña</Form.Label>
                                <Form.Control type="password" required className={styles.inputField} value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <div className={styles.forgotPassword}>
                                <Link to="/change_password">¿Olvidó su contraseña?</Link>
                            </div>
                            <Button variant="primary" type="submit" className={styles.button}>
                                Iniciar sesión
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;

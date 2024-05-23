import styles from 'src/components/ContentTable.module.css'
import commonStyles from 'src/components/Common.module.css'
import TreatmentView from 'src/views/TreatmentView.jsx'

import Treatment from 'src/components/Treatment.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ContentTable({ title, handler, children }) {

    return (
        <>
            <Container fluid="xl">
                <Row>
                    <Col className='d-flex justify-content-center text-center' sm={12}>
                        <h2 className={commonStyles.title}>  {title} </h2>
                    </Col>
                </Row>
                <Row >
                    {children}
                </Row>
            </Container>

        </>
    );
}

export default ContentTable;
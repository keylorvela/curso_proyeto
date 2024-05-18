import React from 'react';
import styles from 'src/components/CardsInformation.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CardsInformation({ titles, contents }) {
    return (
        <>
        <Row className={styles.cardsMainContainer}>
            {
            titles.map(
                (title, index) => (
                    contents[index]
                    &&
                    <React.Fragment key={index}>
                        <Col className={styles.informationCard}>
                            <Row>
                                <Col>
                                    <h3 className="fs-2 fw-semibold my-3" style={{ color: "var(--main-blue)" }}>{title}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        (contents[index].includes('/')) ? (
                                            contents[index].split('/').map((value, subIndex) => (
                                                <p className="fs-4" key={`${index}-${subIndex}`}>{value}</p>)
                                            )
                                        ) : (
                                            <p className="fs-4" key={`${index}-${0}`}>{contents[index]}</p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </React.Fragment>
                )
            )
            }
        </Row>
        {
            (contents[0]) ? (
                <hr className={styles.divider}></hr>
            ) : (
                <></>
            )
        }
        </>
    )
}

export default CardsInformation;
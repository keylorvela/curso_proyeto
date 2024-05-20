import React from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

function TablemModal({ show, onHide, title, photo, roundedPhoto, linkText, linkFunction, acceptButton, rejectButton,reviewButton, labels }) {

    const linkTextWithArrow = (
        <span>
          {linkText}    <FontAwesomeIcon icon={faArrowDown} />
        </span>
      );
    return (
        <Modal show={show} onHide={onHide} size="lg" centered animation = {false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {photo && (
                        <Col xs={12} md={4}>
                            <Image src={photo} className={roundedPhoto ? 'rounded-circle' : ''} fluid />
                        </Col>
                    )}
                    <Col xs={12} md={photo ? 4 : 6}>
                        {labels.map((label, index) => {
                            if (index <= 1) {
                                return (
                                    <p key={index}>
                                        <strong>{label.title}: </strong> {label.content}
                                    </p>
                                );
                            }
                            return null;
                        })}
                        {linkText && (
                            <p>
                                <a href="#" onClick={linkFunction}>{linkTextWithArrow}</a>
                            </p>
                        )}
                    </Col>
                    <Col xs={12} md={photo ? 4 : 6}>
                        {labels.map((label, index) => {
                            if (index > 1) {
                                return (
                                    <p key={index}>
                                        <strong>{label.title}: </strong> {label.content}
                                    </p>
                                );
                            }
                            return null;
                        })}
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer>
                {rejectButton && <Button variant="danger" onClick={rejectButton.onClick}>{rejectButton.text}</Button>}
                {acceptButton && <Button variant="success" onClick={acceptButton.onClick}>{acceptButton.text}</Button>}
                {reviewButton && <Button variant="secondary" onClick={reviewButton.onClick}>{reviewButton.text}</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default TablemModal;

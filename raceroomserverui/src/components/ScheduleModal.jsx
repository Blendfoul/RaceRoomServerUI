import React from 'react';
import {Col, Container, Modal, ModalBody, ModalHeader, Row} from "reactstrap";

const ScheduleModal = props => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} centered size={"lg"}>
            <ModalHeader toggle={props.toggle}>Weekly Schedule</ModalHeader>
            <ModalBody>
                <Container fluid>
                    <Row>
                        <Col>
                            <img src="https://evosupport.raceroom.com/index.php/apps/files_sharing/publicpreview/tne8CWb45oQmcTx?file=/schedule%20post.png&amp;x=1000&amp;y=1080&amp;a=true&amp;c=2021-01-15 15:08:54 +01:00" className={"img-fluid"} alt={"Schedule"}/>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
    );
};

export default  ScheduleModal;

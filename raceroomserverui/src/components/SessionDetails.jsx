import React, {useState, useEffect} from 'react';
import {Button, Col, Collapse, Row} from "reactstrap";
import Countdown from "react-countdown";

const SessionDetails = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState("");
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        switch (props.currentSession) {
            case 0: setSession("Pratice"); break;
            case 256: setSession("Qualify"); break;
            case 768: setSession("Race"); break;
            default: setSession("Unknown"); break;
        }
    }, [props.currentSession]);



    return (
        <Row>
            <Button color={"default"} block={true} onClick={toggle}>
                <h5 className="text-center dropdown-toggle">Session Details</h5>
            </Button>
            <Collapse isOpen={isOpen} className={"w-100"}>
                <Row className={"mt-3"}>
                    <Col xs={6} >
                        <h6 className="text-center font-weight-bold">Session</h6>
                        <p className="text-center">{session}</p>
                    </Col>
                    <Col xs={6} className={"d-flex flex-column justify-content-start align-items-center"}>
                        <h6 className="text-center font-weight-bold">Time Left</h6>
                        <Countdown className={"text-center"} date={Date.now() + props.timeLeft}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <h6 className="text-center font-weight-bold">P</h6>
                        <p className="text-center">{props.session.PracticeDuration} min</p>
                    </Col>
                    <Col xs={4}>
                        <h6 className="text-center font-weight-bold">Q</h6>
                        <p className="text-center">{props.session.QualifyDuration} min</p>
                    </Col>
                    <Col xs={4}>
                        <h6 className="text-center font-weight-bold">R</h6>
                        <p className="text-center">{props.session.Race1Duration} min</p>
                    </Col>
                    {props.session.Race2Duration !== 0 ?
                        <Col xs={4}>
                            <h6 className="text-center font-weight-bold">R2</h6>
                            <p className="text-center">{props.session.Race2Duration} min</p>
                        </Col> : ""}

                    {props.session.Race3Duration !== 0 ?
                        <Col xs={4}>
                            <h6 className="text-center font-weight-bold">R3</h6>
                            <p className="text-center">{props.session.Race3Duration} min</p>
                        </Col> : ""}
                </Row>
                <Row className="mt-3">
                    <Col xs={6}>
                        <h6 className="text-center font-weight-bold">Tyre Wear</h6>
                        <p className="text-center">{props.session.TireWear}x</p>
                    </Col>
                    <Col xs={6}>
                        <h6 className="text-center font-weight-bold">Fuel Usage</h6>
                        <p className="text-center">{props.session.FuelUsage}x</p>
                    </Col>
                </Row>
            </Collapse>
        </Row>
    )
};

export default SessionDetails;

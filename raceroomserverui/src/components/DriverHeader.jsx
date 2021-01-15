import React from 'react';
import {Col, Label, Row} from "reactstrap";

const DriverHeader = props => {
    return (
        <header>
           <Row className={"p-3"}>
               <Col xs={12} md={3} className={"d-flex justify-content-center align-items-center"}>
                   <img src={props.driver.avatar} alt={props.driver.name} className={"img-thumbnail"} />
               </Col>
               <Col xs={12} md={9} className={"mt-3"}>
                   <Row>
                       <Col>
                           <Label className={"font-weight-bold"}>Driver Name</Label>
                           <p>{props.driver.name}</p>
                       </Col>
                       <Col className="d-flex align-items-center justify-content-center flex-column">
                           <Label className={"font-weight-bold"}>Rating</Label>
                           <p>{props.driver.raceList[0].RatingAfter}</p>
                       </Col>
                       <Col className="d-flex align-items-center justify-content-center flex-column">
                           <Label className={"font-weight-bold"}>Reputation</Label>
                           <p>{props.driver.raceList[0].ReputationAfter}</p>
                       </Col>
                   </Row>
                   <Row className={"pt-3"}>
                       <Col>
                           <Label className={"font-weight-bold"}>Team Name</Label>
                           <p>{props.driver.team}</p>
                       </Col>
                       <Col className="d-flex align-items-center justify-content-center flex-column">
                           <Label className={"font-weight-bold"}>Total Races</Label>
                           <p>{props.driver.totalRaces}</p>
                       </Col>
                       <Col className="d-flex align-items-center justify-content-center flex-column">
                            <Label className={"font-weight-bold"}>Competition Rating</Label>
                           <p>{props.driver.rank}</p>
                       </Col>
                   </Row>
               </Col>
           </Row>
        </header>
    );
};

export default DriverHeader;

import {Col, Row} from "reactstrap";
import React, {useContext} from "react";
import {RaceContext} from "./RaceContext";

const HeaderContainer = () => {
    const [data, setData] = useContext(RaceContext);

    const changeRegion = event => {
       setData(prevData => {
           return {...prevData, region: event.target.value}});
    }

    return(
        <header className={"pt-3"}>
            <Row>
                <Col md={4} xs={12}>
                    <select className={"form-control"} value={data.region} onChange={changeRegion}>
                        <option value={0}>All</option>
                        <option value={1}>Europe</option>
                        <option value={2}>Brazil</option>
                        <option value={3}>U.S. West</option>
                        <option value={4}>Oceania</option>
                    </select>
                </Col>
                <Col md={4} xs={12} className={"d-flex align-items-center justify-content-center"}>
                    <span className="text-light text-center">{new Date().toUTCString()}</span>
                </Col>
            </Row>
        </header>
    );
};

export default HeaderContainer;
/* <option value={5}>Weekly Endurance</option>*/

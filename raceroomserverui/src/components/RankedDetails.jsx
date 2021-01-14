import React, {useEffect, useState} from "react";
import {Col, Row, Spinner} from "reactstrap";
import axios from "axios";
import DriverList from "./DriverList";

const RankedDetails = props => {
    const [drivers, setDrivers] = useState({sof: 0, rep: 0, joined: []});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            await setIsLoading(true);

            const data = await axios(`/userId/${encodeURIComponent(JSON.stringify(props.drivers))}`);
            setDrivers(data.data);

            await setIsLoading(false);
        }

        fetchDetails();
    }, [props.drivers]);

    return (
        isLoading
            ?
            <Row>
                <Col className="d-flex justify-content-center">
                    <Spinner style={{width: '3rem', height: '3rem'}}/>{' '}
                </Col>
            </Row>
            :
            <div>
                <Row className="justify-content-center">
                    <Col xs={4}>
                        <h6 className="text-center font-weight-bold">Players Connected</h6>
                        <p className="text-center">{props.players}</p>
                    </Col>
                    <Col xs={4}>
                        <h6 className="text-center font-weight-bold">SoF</h6>
                        <p className="text-center">{drivers.sof.toFixed(3)}</p>
                    </Col>
                    <Col xs={4}>
                        <h6 className="text-center font-weight-bold">Average Rep.</h6>
                        <p className="text-center">{drivers.rep.toFixed(3)}</p>
                    </Col>
                </Row>
                <DriverList drivers={drivers.drivers}/>
            </div>
    )
};

export default RankedDetails;

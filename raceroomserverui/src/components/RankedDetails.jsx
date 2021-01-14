import React, {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import axios from "axios";
import DriverList from "./DriverList";

const RankedDetails = props => {
    const [drivers, setDrivers] = useState({sof: 0, rep: 0, joined: []});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            await setIsLoading(true);
            const data = [];

            for (const value of props.drivers) {
                const driver = await axios(`/userId/${value}`);
                data.push(driver.data);
            }

            let sof = 0, rep = 0;
            data.forEach(driver => {sof += driver.Rating; rep += driver.Reputation});
            if(sof !== 0) {
                sof /= data.length;
                rep /= data.length;
            }

            setDrivers({sof: sof, rep: rep, joined: data});

            await setIsLoading(false);
        }

        fetchDetails();
    }, [props.drivers]);

    return(
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
            <DriverList drivers={drivers.joined} />
        </div>
    )
};

export default RankedDetails;

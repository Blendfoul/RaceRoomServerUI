import React, {useState} from 'react';
import {Button, Col, Collapse, Row, Table} from "reactstrap";

const DriverList = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Row>
                <Col>
                    <Button color={"default"} disabled={props.drivers.length === 0} block onClick={toggle}>
                        <h5 className="text-center dropdown-toggle">Driver Info</h5>
                    </Button>
                </Col>
            </Row>
            <Collapse isOpen={isOpen}>
                <Table>
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Reputation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.drivers
                            .sort((a, b) => b.Rating - a.Rating)
                            .map(driver =>
                                <tr>
                                    <td>{driver.Fullname}</td>
                                    <td>{driver.Rating}</td>
                                    <td>{driver.Reputation}</td>
                                </tr>
                            )
                    }
                    </tbody>
                </Table>
            </Collapse>
        </div>
    )
};

export default DriverList;

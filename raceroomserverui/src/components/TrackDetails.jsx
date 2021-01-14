import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Col, Collapse, Row, Spinner} from "reactstrap";

const TrackDetails = props => {
    const [details, setDetails] = useState({image: {logo: ""}, content_info: {name: ""}});
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const fetchDetails = async () => {
            await setIsLoading(true);
            const response = await axios('tracks');

            const data = await response.data;

            const trackDetails = data.find(value => (props.id - 1 === value.cid || props.id - 2 === value.cid));

            setDetails(trackDetails);
            await setIsLoading(false);
        }

        fetchDetails();
    }, [props.id]);


    return(
        <Row>
            <Button color={"default"} block={true} onClick={toggle}>
                <h5 className="text-center dropdown-toggle">Track Info</h5>
            </Button>
            <Collapse isOpen={isOpen} className={"w-100"}>
                {isLoading
                    ?
                    <Row>
                        <Col className="d-flex justify-content-center">
                        <Spinner style={{width: '3rem', height: '3rem'}}/>{' '}
                        </Col>
                    </Row>
                    :
                    <div>
                        <Row className={"justify-content-center"}>
                            <img src={details.image.logo} className={"img-fluid w-25"} alt={details.content_info.name}/>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <h6 className="text-center font-weight-bold">Name</h6>
                                <p className="text-center">{details.content_info.name}</p>
                            </Col>
                            <Col xs={6}>
                                <h6 className="text-center font-weight-bold">Country</h6>
                                <p className="text-center">{details.content_info.country.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6 className="text-center font-weight-bold">Max Players</h6>
                                <p className="text-center">{props.maxPlayers}</p>
                            </Col>
                        </Row>
                    </div>
                }
            </Collapse>
        </Row>
    );
};

export default TrackDetails;

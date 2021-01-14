import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Col, Collapse, Row, Spinner} from "reactstrap";

const TrackDetails = props => {
    const [details, setDetails] = useState({image: {logo: ""}, content_info: {name: ""}});
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    const trackLayout = async (tracks) => {
        let trackData = undefined;

        for (const track in tracks) {
            trackData = tracks[track].layouts.find(value => value.Id === props.id);
            if( trackData !== undefined)
                break;
        }

        const response = await axios("/tracks/image/" + tracks[`${trackData?.Track}`].Name.replace(" ", "-").toLowerCase());

        const logo = response.data;

        return {track: tracks[`${trackData?.Track}`], layout: trackData, logo: logo};
    };

    useEffect(() => {
        const fetchDetails = async () => {
            await setIsLoading(true);
            const response = await axios('tracks');

            const data = await response.data;

            const trackDetails = await trackLayout(data);

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
                            <img src={details.logo} className={"img-fluid w-25"} alt={details.track.Name}/>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <h6 className="text-center font-weight-bold">Name</h6>
                                <p className="text-center">{details.track.Name}</p>
                            </Col>
                            <Col xs={6}>
                                <h6 className="text-center font-weight-bold">Layout</h6>
                                <p className="text-center">{details.layout.Name}</p>
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

import React, {useState, useEffect} from 'react';
import {Col, Row} from "reactstrap";
import axios from "axios";

const CarClasses = props => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axios("classes/" + encodeURIComponent(JSON.stringify(props.liveries)));
            const data = response.data

            setClasses(data);
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <Row>
                <Col>
                    <h6 className="text-center font-weight-bold">Classes</h6>
                </Col>
            </Row>
            <Row className={"justify-content-center"}>
                {
                    classes.map((value, index) => <img src={`https://game.raceroom.com/store/image_redirect?id=${value}&amp;size=thumb`} className="img-fluid" alt="" key={"class-"+index}/>)
                }
            </Row>
        </div>
    )
};

export default CarClasses;

import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Spinner} from "reactstrap";
import {
    useParams
} from "react-router-dom";
import axios from "axios";
import DriverHeader from "./DriverHeader";
import RaceTable from "./RaceTable";
import BackRouter from "./BackRouter";

const DriverContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState(null);
    let { userName } = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios("/user/" + userName, {
                    cancelToken: source.token,
                });

                setDetails(await response.data);
                setIsLoading(false);
            } catch (e) {

            }

        };

        fetchData();

        return () => {
            source.cancel()
        }
    }, [])

    return (
        <div>
            <BackRouter context={"/"}/>
            {
                isLoading ?
                    <Row className={"pt-5"}>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Spinner style={{width: '3rem', height: '3rem'}}/>{' '}
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Container className={"my-5 rounded"}>
                            <DriverHeader driver={details}/>
                            <hr/>
                            <RaceTable races={details.raceList} />
                        </Container>
                    </Row>
            }
        </div>
    );
};

export default DriverContainer;

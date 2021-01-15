import React, {useEffect, useContext, useState} from "react";
import {Col, Row, Spinner} from "reactstrap";
import axios from 'axios';
import Race from "./Race";
import {RaceContext} from "./RaceContext";

const RaceContainer = () => {
    const [data, setData] = useContext(RaceContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios(`/server/${data.region}`, {
                    cancelToken: source.token,
                });

                const races = await response.data.result;
                setData({...data, races: races});
                setIsLoading(false);
            } catch (e) {

            }

        };

        fetchData()

        return () => {
            source.cancel()
        }
    }, [data.region]);

    return (
        isLoading
            ?
            <Row className={"mt-5"}>
                <Col className="d-flex justify-content-center align-items-center">
                    <Spinner style={{width: '3rem', height: '3rem'}}/>{' '}
                </Col>
            </Row>
            :
            <Row className={"mt-3"}>
                {
                    data.races.map((race, index) => <Race data={race} key={index}/>)
                }
            </Row>
    );
};

export default RaceContainer;

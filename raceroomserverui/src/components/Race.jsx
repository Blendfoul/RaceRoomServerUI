import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, Col, ListGroup, ListGroupItem} from "reactstrap";
import TrackDetails from "./TrackDetails";
import SessionDetails from "./SessionDetails";
import RankedDetails from "./RankedDetails";

const Race = props => {
    const [border, setBorder] = useState("success");

    useEffect(() => {
        switch (props.data.Server.CurrentSession) {
            case 0: setBorder("success"); break;
            case 256: setBorder("warning"); break;
            case 768: setBorder("danger"); break;
            default: setBorder("info"); break;
        }
    }, [props.data.Server.CurrentSession]);


    return (
        <Col xs={12} md={6} lg={4}>
            <Card className={"my-2 border-" + border}>
                <img src={props.data.Server.Settings.Thumbnail} className="card-img-top"
                     alt={props.data.Server.Settings.ServerName}/>
                <CardBody className={""}>
                    <ListGroup flush>
                        <ListGroupItem>
                            <h4 className="text-center">
                                {props.data.Server.Settings.ServerName}
                            </h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <TrackDetails id={props.data.Server.Settings.TrackLayoutId[0]}
                                  maxPlayers={props.data.Server.Settings.MaxNumberOfPlayers}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            <SessionDetails session={props.data.Server.Settings}
                                currentSession={props.data.Server.CurrentSession}
                                timeLeft={props.data.Server.TimeLeft}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            <RankedDetails players={props.data.Server.PlayersOnServer} drivers={props.data.Server.Players}/>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
                <CardFooter>
                    {
                        props.data.Server.CurrentSession === 0 ?
                            <a className="btn btn-success btn-lg btn-block"
                               href={`rrre://multiplayer/join?data={"MultiplayerJoin":{"Address":"${props.data.Server.ServerIp}:${props.data.Server.Port}"}}`}>
                                Join Server
                            </a>
                            :
                            <Button className="btn btn-danger btn-lg btn-block" disabled>Session Closed</Button>
                    }
                </CardFooter>
            </Card>
        </Col>
    );
}

export default Race;

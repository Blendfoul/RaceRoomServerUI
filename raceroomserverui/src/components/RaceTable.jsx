import React from 'react';
import {Row, Table} from "reactstrap";

const RaceTable = props => {
    const races = props.races;
    return (
        <Row>
            <div style={{maxHeight: '550px', width: "100%", overflowY: 'auto'}}>
                <Table responsive hover borderless>
                    <thead>
                    <tr>
                        <th className={"text-center"}>Class</th>
                        <th className={"text-center"}>Start Position</th>
                        <th className={"text-center"}>Finish Position</th>
                        <th className={"text-center"}>Incidents</th>
                        <th className={"text-center"}>Drivers</th>
                        <th className={"text-center"}>Rating +/-</th>
                        <th className={"text-center"}>Reputation +/-</th>
                        <th className={"text-center"}>Rating</th>
                        <th className={"text-center"}>Reputation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        races.reverse().map((race, index) =>
                            <tr key={index}>
                                <td className={"text-center"} scope="row">
                                    {race.CarClasses.map((value, index) => <img src={`https://game.raceroom.com/store/image_redirect?id=${value.Id}&amp;size=thumb`} style={{width: "12.5%"}} alt="" key={"class-"+index}/>)}
                                </td>
                                <td className={"text-center"}>{race.StartPosition}</td>
                                <td className={"text-center"}>{race.FinishPosition}</td>
                                <td className={"text-center"}>{race.IncidentPoints}</td>
                                <td className={"text-center"}>{race.PlayersCount}</td>
                                <td className={`text-center ${race.RatingChange > 0 ? "bg-success" : "bg-danger"}`}>{race.RatingChange}</td>
                                <td className={`text-center ${race.ReputationChange > 0 ? "bg-success" : "bg-danger"}`}>{race.ReputationChange}</td>
                                <td className={"text-center"}>{race.RatingAfter}</td>
                                <td className={"text-center"}>{race.ReputationAfter}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        </Row>


    );
};

export default RaceTable;

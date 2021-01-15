import React from 'react';
import {Container} from "reactstrap";
import BackRouter from "./BackRouter";
import ServerTable from 'react-strap-table';


const RatingContainer = () => {
    const columns = ["id", "Fullname", "Rating", "Reputation", "Activity", "Username"];
    const options = {
        headings: {id: '#', Fullname: "Name", Username: ''},
        perPage: 100,
        columnsWidth: {id: 10, Fullname: 50, Rating: 10, Reputation: 10, Activity: 10, Username: 10},
    };

    return (
        <div>
            <BackRouter context={"/"}/>
            <Container>
                <ServerTable columns={columns}
                             url={"http://localhost:8080/ratings"}
                             options={options}
                             responsive hover/>
            </Container>
        </div>
    );
};

export default RatingContainer;

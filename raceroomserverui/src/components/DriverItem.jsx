import React from 'react';
import {Link} from "react-router-dom";


const DriverItem = props => {
    return (
        <tr >
            <td>{props.driver.Fullname}</td>
            <td>{props.driver.Rating}</td>
            <td>{props.driver.Reputation}</td>
            <td style={{cursor: "pointer"}}>
                <Link to={"/user/" + props.driver.Username}>
                        <i className="bi bi-info-square"/>
                </Link>
            </td>
        </tr>
    );
};

export default DriverItem;

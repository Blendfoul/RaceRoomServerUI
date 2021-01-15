import {Button, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import React from "react";

function BackRouter(props) {
    return <Row className={"p-3"}>
        <Col>
            <Link to={props.context}>
                <Button color={"info"} outline={true}>
                    <i className="bi bi-arrow-bar-left"/>
                    <span className={"p-3"}>back</span>
                </Button>
            </Link>
        </Col>
    </Row>;
}

export default BackRouter;

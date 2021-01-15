import {Button, Col, PopoverBody, PopoverHeader, Row, UncontrolledPopover} from "reactstrap";
import React, {useContext, useState} from "react";
import {RaceContext} from "./RaceContext";
import ScheduleModal from "./ScheduleModal";

const HeaderContainer = () => {
    const [data, setData] = useContext(RaceContext);
    const [isOpen, setOpen] = useState(false)

    const toggle = () => setOpen(!isOpen);

    const changeRegion = event => {
       setData(prevData => {
           return {...prevData, region: event.target.value}});
    }

    return(
        <header className={"pt-3"}>
            <Row>
                <Col md={4} xs={12}>
                    <select className={"form-control"} value={data.region} onChange={changeRegion}>
                        <option value={0}>All</option>
                        <option value={1}>Europe</option>
                        <option value={2}>Brazil</option>
                        <option value={3}>U.S. West</option>
                        <option value={4}>Oceania</option>
                    </select>
                </Col>
                <Col md={4} xs={12} className={"d-flex align-items-center justify-content-center py-3"}>
                    <span className="text-light text-center">{new Date().toUTCString()}</span>
                </Col>
                <Col md={4} xs={12}>
                    <Row>
                        <Col>
                            <Button outline color={"primary"} block onClick={toggle}>
                                <i className="bi bi-calendar-event px-1"/>
                                <span>Schedule</span>
                            </Button>
                            <ScheduleModal isOpen={isOpen} toggle={toggle}/>
                        </Col>
                        <Col>
                            <Button outline color={"primary"} block id={"PopoverFocus"}>
                                <i className="bi bi-view-list px-1"/>
                                <span>Ratings</span>
                            </Button>
                            <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                                <PopoverBody>Coming Soon!</PopoverBody>
                            </UncontrolledPopover>
                        </Col>
                        <Col>
                            <form action="https://discord.gg/RaceRoom" target={"_blank"}>
                                <Button type={"submit"} outline color={"primary"} block className={"d-flex justify-content-center align-items-center"}>
                                    <i className="bi bi-discord px-1"/>
                                    <span>Discord</span>
                                </Button>
                            </form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </header>
    );
};

export default HeaderContainer;
/* <option value={5}>Weekly Endurance</option>
* <Link to={"/ratings"} style={{"textDecoration": "none"}}>

                            </Link>
*
* */

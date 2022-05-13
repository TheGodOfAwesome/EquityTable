import React from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBRow } from "mdbreact";
import apexlegend from '../assets/imgs/maze.png';
import fortnite_banner from '../assets/imgs/maze_inverse.png';
import './Features.css';

const Features = () => {
  return (
    <MDBContainer className="align-middle">
        <br />
        <MDBRow className="align-middle" style={{float:"center"}}>
            {/* <MDBCol> */}
                <MDBCard className="m-4" style={{height: "20rem", width: "20rem"}}>
                    <MDBCardImage
                        src={apexlegend}
                        alt="MDBCard image cap"
                        top
                        hover
                        overlay="white-slight"
                    />
                    <MDBCardBody className="cardbody">
                        {/* <MDBCardTitle tag="h5">Panel title</MDBCardTitle> */}
                        <MDBCardText>
                            <p>
                                Overview
                                <br />
                            </p>
                            {/* <p><img src={twentyfour} height="12" alt="ranxed logo"/>hr Challenge</p> */}
                            <p>
                                <i className="fa fa-trophy icon"/>&nbsp; Apex Legends <br/>
                                &nbsp; TBA
                            </p>
                        </MDBCardText>
                        {/* <MDBBtn className="button float-right" size="md">
                            read more
                        </MDBBtn> */}
                    </MDBCardBody>
                </MDBCard>
            {/* </MDBCol> */}

            <MDBCard border="" className="m-4" style={{height: "20rem", width: "20rem"}}>
                <MDBCardImage
                    src={fortnite_banner}
                    alt="MDBCard image cap"
                    top
                    hover
                    overlay="white-slight"
                />
                <MDBCardBody className="cardbody">
                    <MDBCardText>
                        <p>
                            Assets Table
                            <br />
                        </p>
                        {/* <p><img src={twentyfour} height="12" alt="ranxed logo"/>hr Challenge</p> */}
                        <p>
                            <i className="fa fa-trophy icon" />&nbsp; Dota2 <br />
                            &nbsp; TBA
                        </p>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>

            <MDBCard border="" className="m-4" style={{height: "20rem", width: "20rem"}}>
                <MDBCardImage
                    src={fortnite_banner}
                    alt="MDBCard image cap"
                    top
                    hover
                    overlay="white-slight"
                />
                <MDBCardBody className="cardbody">
                    <MDBCardText>
                        <p>
                            Watchlists
                            <br />
                        </p>
                        <p>
                            <i className="fa fa-trophy icon" />&nbsp; Fortnite <br />
                            &nbsp; TBA
                        </p>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            
        </MDBRow>
    </MDBContainer>
  );
}

export default Features;
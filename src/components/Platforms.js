import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView } from "mdbreact";
import platforms from '../assets/imgs/platform.png';

class Platforms extends Component {
    state = {
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <MDBContainer style={{paddingTop:"2em"}}>
                <MDBRow>
                    <MDBCol lg="5">
                        <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                        <img
                            className="img-fluid"
                            src={platforms}
                            alt=""
                        />
                        </MDBView>
                    </MDBCol>
                    <MDBCol lg="7">
                        <h4 className="font-weight-bold dark-grey-text my-4">
                            <p>
                                <i> 
                                    Compete on the platform that best suits YOUR play style <br/>
                                    With match modes on all of the major consoles, PC/Mac and mobile. <br/>
                                    Join matches anytime, anywhere. 
                                </i>
                            </p>
                        </h4>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Platforms;
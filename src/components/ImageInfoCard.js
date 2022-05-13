import React, { Component } from 'react';
import table from '../assets/imgs/table.png';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBIcon, MDBBtn, MDBModal, MDBModalBody } from "mdbreact";
import SignUpForm from './SignUpForm';
// import SignInForm from './SignInForm';

export class ImageInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            games: [],
            modal8: false,
        };
    }

    componentDidMount () {
    }
    
    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    openLink() {
        const url = './link';
        window.location = url;
    }

    render() {
        return (
            <MDBContainer>
                <br />
                <MDBRow>
                    <MDBCol md="12" rounded className="mb-4">
                        <MDBCard
                            className="card-image"
                            rounded
                            style={{backgroundImage: "url("+ table +")"}}
                            overlay="black-slight"
                        >
                            <div className="text-left d-flex align-items-center py-5 px-4 rounded">
                                <div style={{color:"white"}}>
                                    <h3 className="py-3 font-weight-bold">
                                        {/* <MDBIcon icon="chart-area" /> */}
                                        <strong> Keep track of ALL your assets</strong>
                                    </h3>
                                    <p className="pb-3">
                                        <strong>Keep an eye on all of your cryptocurrencies and stocks using one tool.</strong><br/>
                                        <strong>Track future Crypto and Stock purchases using smart watchlists.</strong><br/> 
                                        <strong>In one simple and easy to use interface.</strong><br/>
                                    </p>
                                    <MDBBtn className="button" onClick={this.toggle(8)} rounded size="md">
                                        <MDBIcon far icon="clone" className="left" /> Sign Up
                                    </MDBBtn>
                                </div>
                            </div>
                        </MDBCard>
                        
                        <MDBContainer>
                            <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} side position="top-right">
                                <MDBModalBody toggle={this.toggle(8)}  className="form">
                                    <SignUpForm/>
                                </MDBModalBody>
                            </MDBModal>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default ImageInfoCard
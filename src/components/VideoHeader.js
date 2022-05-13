import React, { Component } from 'react';
// import auth from '../../auth/initAuth';
import axios from 'axios';
import moment from 'moment';
import video from '../assets/video/glitch.mp4';
import { MDBMask, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBIcon } from 'mdbreact';
import './VideoHeader.css';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export class VideoHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            games: [],
            modal6: false,
            modal7: false
        };
    }

    componentDidMount () {
    }
    
    openGames() {
        const url = './games';
        window.location = url;
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

    _renderSignInOpts = () => {
        // const user = auth.getUser();
        return (
            <div>
                <MDBBtn className="button" onClick={this.toggle(8)} value="join">
                    {/* <MDBIcon fas icon="user-plus" className="left"/> */}
                    Sign Up
                </MDBBtn>
                <MDBBtn outline color="white" onClick={this.toggle(9)}>Sign In</MDBBtn>
            </div>
        )
    }

    _renderPlayNow = () => {
        return (
            <div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <header>
                    <div className="view">
                        <video  className="video-fluid" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                            <source src={video} type="video/mp4"/>
                        </video>
                        <div className="mask flex-center white-slight">
                        </div>
                        <MDBMask className="rgba-black-light d-flex justify-content-center align-items-center">
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol md="12" className="mb-4 white-text text-left">
                                    <h2 className="">
                                        equitytable
                                    </h2>
                                    
                                    { this._renderSignInOpts() }

                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBMask>
                        
                        <MDBContainer>
                            <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} side position="top-right">
                                <MDBModalBody toggle={this.toggle(8)}  className="form">
                                    <SignUpForm/>
                                </MDBModalBody>
                            </MDBModal>
                            <MDBModal isOpen={this.state.modal9} toggle={this.toggle(9)} side position="top-right">
                                <MDBModalBody toggle={this.toggle(9)} className="form">
                                    <SignInForm/>
                                </MDBModalBody>
                            </MDBModal>
                        </MDBContainer>
                    </div>
                </header>
            </div>
        )
    }
}

export default VideoHeader
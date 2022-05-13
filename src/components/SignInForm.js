import React, { Component } from 'react';
import axios from 'axios';
import auth from '../services/auth/initAuth';
// import ReCAPTCHA from "react-google-recaptcha";
import LoadingSpinner from './LoadingSpinner';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBModalHeader } from 'mdbreact';
import './Forms.css';
// import logo from '../../img/logo.png';

class SignInForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: null,
            passwordResetEmail: null,
            password: null,
            resetPassword: false,
            loading: false,
            recaptcha: false,
            error: null
        }
    }

    _handleSubmit = (e, data) => {
        this.setState({ error: "" });
        // e.preventDefault();
        // auth.setProfile({ email: this.state.email });
        // if (this.state.recaptcha) {
        // auth.login(this.state.email, this.state.password);
        // this.setState({
        //     loading: true
        // });
        // } else {
        // this.setState({
        //     error: "Please confirm you are not a robot!"
        // });
        // }
        this.setState({
            loading: true,
            error: "" 
        });
        e.preventDefault();
        if (!this.state.email || !this.state.password /*|| !this.state.recaptcha*/) {
            const error = 'Please check that all information has been entered correctly!';
            this.setState({ error });
        } else {
            this.setState({
                loading: !this.state.loading,
            });

            axios
            .post(
                process.env.REACT_APP_EQUITYTABLE_USER_SERVICE_URL 
                + 'function=login&api_key=' + 
                process.env.REACT_APP_EQUITYTABLE_USER_SERVICE_API_KEY, 
                {
                    user: this.state.email,
                    password: this.state.password
                }
            )
            .then(result => {
                // auth.signup(this.state.email, this.state.username, this.state.password);
                var error = result.data.message;
                this.setState({loading: !this.state.loading});
                if (error && error != '') { 
                    this.setState({ error });
                } else {
                    auth.setUser(result.data.responsePayload.user);
                    auth.setUserToken(result.data.token);
                    auth.setApiKey(result.data.api_key);
                    window.location = window.location.origin //redirect to main page
                }
            })
            .catch(error => {
                this.setState({
                    loading: !this.state.loading,
                });
                console.log(error);
            });
        }
    }

    _handleResetPasswordSubmit = (e, data) => {
        e.preventDefault();
        auth.resetPassword(this.state.passwordResetEmail);
        this.setState({
            error: "A reset link has been sent to your email " + this.state.passwordResetEmail + "!"
        });
    }

    _handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
            loading: false
        })
    }

    _handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            loading: false
        })
    }

    _handlePasswordReset() {
        this.setState({
            resetPassword: !this.state.resetPassword
        });
    }

    _handlePasswordResetEmailChange = (e) => {
        this.setState({passwordResetEmail: e.target.value});
    }

    // _handleRecaptcha = (value) => {
    //     if(value.length) this.setState({recaptcha: true});
    // }

    _renderSignInForm = () => {
        return(
            <MDBContainer className="form">
            <MDBRow>
                <MDBCol md="12">
                <MDBModalHeader
                    className='text-center'
                    titleClass='w-100 font-weight-bold'
                    style={{color:'black'}}
                >
                    Sign In
                </MDBModalHeader>
                <form className="signInForm" onSubmit={this._handleSubmit}>
                    <div className="grey-text content">
                        <MDBInput
                            label="Your email"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            onChange={this._handleEmailChange}
                        />
                        <MDBInput
                            label="Your password"
                            group
                            type="password"
                            validate
                            onChange={this._handlePasswordChange}
                        />
                        <div className="text-center">
                            {/* <div style={{paddingLeft: "20px"}}>
                            <ReCAPTCHA
                                style={{width:"100%"}}
                                size="normal"
                                data-theme="dark"            
                                render="explicit"
                                sitekey="6LcD69gUAAAAABqFe314EsBvXCfENPTwa78JRwgy"
                                onChange={this._handleRecaptcha}
                            />
                            </div> */}
                            <h7 className="error-text">{this.state.error}</h7>
                        </div>
                    </div>
                    <br/>
                    <div className="text-center">
                    { 
                        this.state.loading
                        ? this._renderLoadingSpinner()
                        : <MDBBtn className="button" type="submit" value="Login">Sign In</MDBBtn>
                    }
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
            <div className="text-center">
                <MDBBtn className="z-depth-0" outline color="transparent" onClick={() => { this._handlePasswordReset() }}>Reset Password!</MDBBtn>
            </div>
            </MDBContainer>
        )
    }

    _renderPasswordResetForm = () => {
        return(
        <MDBContainer className="form">
            <MDBRow>
            <MDBCol md="12">
                <form className="signInForm" onSubmit={this._handleResetPasswordSubmit}>
                <p className="h5 text-center mb-4 text"> 
                    Reset Password
                </p>
                <h7 className="error-text">{this.state.error}</h7>
                <div className="grey-text">
                    <MDBInput
                    label="Your email"
                    group
                    type="email"
                    validate
                    onChange={this._handlePasswordResetEmailChange}
                    />
                </div>
                <div className="text-center">
                    <MDBBtn className="button" type="submit" value="Reset">Reset</MDBBtn>
                </div>
                </form>
            </MDBCol>
            </MDBRow>
            <div className="text-center">
                <MDBBtn className="z-depth-0 grey-text" outline color="transparent" onClick={() => { this._handlePasswordReset() }}>Return to Sign In</MDBBtn>
            </div>
        </MDBContainer>
        )
    }

    _renderLoadingSpinner = () => {
        return(
            <LoadingSpinner/>
        )
    }

    render(){
        return (
        <div>

            { !this.state.resetPassword ? this._renderSignInForm(): this._renderPasswordResetForm() }

        </div>
        );
    }
};

export default SignInForm;
import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBModalHeader, MDBModalBody,
    MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from 'mdbreact';
import LoadingSpinner from './LoadingSpinner';
import './Forms.css';
// import logo from '../../img/logo.png';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            loading: false,
            tos: false,
            showtos: false,
            activeItem: "1",
            recaptcha: false,
            error: null
        };
    }
    
    _handleSubmit = (e, data) => {
        e.preventDefault();
        if (!this.state.username || !this.state.email || !this.state.firstname || !this.state.lastname || !this.state.password
            || !this.validPassword(this.state.password) || !this.state.tos /*|| !this.state.recaptcha*/) {
            const error = 'Please check that all information has been entered correctly!';
            this.setState({ error });
        } else {
            
            this.setState({
                loading: !this.state.loading,
            });

            axios
            .put(
                process.env.REACT_APP_EQUITYTABLE_USER_SERVICE_URL 
                + 'api_key=' + 
                process.env.REACT_APP_EQUITYTABLE_USER_SERVICE_API_KEY, 
                {
                    username: this.state.username,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password
                }
            )
            .then(result => {
                var error = result.data.message;
                if (error == "User Created!") { error+= " Please Sign In With Your New Credentials." }
                this.setState({
                    error,
                    loading: !this.state.loading
                });
                // auth.signup(this.state.email, this.state.username, this.state.password);
            })
            .catch(error => {
                this.setState({
                    loading: !this.state.loading,
                });
                console.log(error);
            });
        }
    }
    
    _handleUserNameChange = (e) => {
        this.setState( {username: e.target.value} );
    }
    
    _handleFirstNameChange = (e) => {
        this.setState( {firstname: e.target.value} );
    }
    
    _handleLastNameChange = (e) => {
        this.setState( {lastname: e.target.value} );
    }

    _handleEmailChange = (e) => {
        this.setState( {email: e.target.value} );
    }

    _handlePasswordChange = (e) => {
        if (!(/[a-z]/.test(e.target.value))) {
            const error = 'Your password must contain at least one lower case letter!';
            this.setState({ error });
        } else if (!(/[A-Z]/.test(e.target.value))) {
            const error = 'Your password must contain at least one upper case letter!';
            this.setState({ error });
        } else if (!(/[0-9]/.test(e.target.value))) {
            const error = 'Your password must contain at least one number!';
            this.setState({ error });
        } else if (!(/[!@#$%^&]/.test(e.target.value))) {
            const error = 'Your password must contain at least one special character!';
            this.setState({ error });
        } else if (e.target.value.length < 8) {
            const error = 'Your password must contain at least 8 characters!';
            this.setState({ error });
        } else {
            const error = '';
            this.setState({ error });
        }
        this.setState( {password: e.target.value} );
    }

    _handleTosChange = (e) => {
        this.setState( {tos: !this.state.tos} );
    }

    _handleRecaptcha = (value) => {
      if(value.length) this.setState({recaptcha: true});
    }

    validPassword(password) {
        var validPassword = false;
        if (!(/[a-z]/.test(password))) {
            const error = 'Your password must contain at least one lower case letter!';
            this.setState({ error });
        } else if (!(/[A-Z]/.test(password))) {
            const error = 'Your password must contain at least one lower case letter!';
            this.setState({ error });
        } else if (!(/[0-9]/.test(password))) {
            const error = 'Your password must contain at least one number!';
            this.setState({ error });
        } else if (!(/[!@#$%^&]/.test(password))) {
            const error = 'Your password must contain at least one special character!';
            this.setState({ error });
        } else if (password.length < 8) {
            const error = 'Your password must contain at least 8 characters!';
            this.setState({ error });
        } else {
            const error = '';
            this.setState({ error });
            validPassword = true;
        }
        return validPassword;
    }

    _renderLoadingSpinner = () => {
        return(
            <LoadingSpinner/>
        )
    }

    
    _renderTOS = () => {
        this.setState({
          showtos: !this.state.showtos
        });
    }

    _renderSignUpForm = () => {
        const { error } = this.state;

        return(
            <MDBContainer className="form">
                <MDBRow>
                    <MDBCol md="12">
                            <MDBModalHeader
                                className='text-center'
                                titleClass='w-100 font-weight-bold'
                                style={{color:'black'}}
                            >
                                Sign Up
                            </MDBModalHeader>
                            <form className="signUpForm" onSubmit={this._handleSubmit} style={{maxHeight:"90vh", overflow:"auto"}}>
                                <h7 className="error-text">{error}</h7>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Username"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={this._handleUserNameChange}
                                    />
                                    <MDBInput
                                        label="Firstname"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={this._handleFirstNameChange}
                                    />
                                    <MDBInput
                                        label="Lastname"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={this._handleLastNameChange}
                                    />
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
                                    <MDBInput
                                        label='I understand and agree to the terms of service and privacy policy.' onChange={this._handleTosChange}
                                        filled type='checkbox' id='termsofservice' containerClass='mr-5' style={{float:"left", height: "20px", width: "20px"}}
                                    />
                                    {/* <ReCAPTCHA
                                      style={{width:"80%"}}
                                      size="normal"          
                                      render="explicit"
                                      sitekey="6LcD69gUAAAAABqFe314EsBvXCfENPTwa78JRwgy"
                                      onChange={this._handleRecaptcha}
                                    /> */}
                                </div>
                                <h7 className="error-text">{error}</h7>
                                <br/>
                                <div className="text-center">
                                    {
                                        this.state.loading 
                                            ? this._renderLoadingSpinner() 
                                            :   <div>
                                                    <MDBBtn className="button" type="submit" value="Sign up">Sign Up</MDBBtn>
                                                    <MDBBtn className="z-depth-0 black-text" outline color="black" onClick={() => { window.location.reload(); }}>Cancel <MDBIcon icon="times" /></MDBBtn>
                                                </div>
                                    }
                                </div>
                                <div className="text-center">
                                    <MDBBtn className="z-depth-0 black-text" outline color="transparent" onClick={() => { this._renderTOS() }}>Privacy Policy and Terms Of Service.</MDBBtn>
                                </div>
                            </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          });
        }
    };
  
    _renderTermsOfService = () => {
        return(  
                <MDBContainer style={{color:"black"}}>
                    <MDBNav className="nav-tabs mt-5">
                        <MDBNavItem>
                            <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                                <div className="black-text">Terms Of Service</div>
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                                <div className="black-text">Privacy Policy</div>
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={this.state.activeItem} >
                        <MDBTabPane className="black-text"  tabId="1" role="tabpanel">
                            <div className="content scrollbar scrollbar-danger" style={{maxHeight:"75vh", overflow:"auto"}}>
                                <h3>Equitytable, Inc. Terms of Service</h3>
                                <p>
                                    1. Terms
                                        By accessing the website at https://www.equitytable.com, you are agreeing to be bound by these terms of service,
                                        all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                        The materials contained in this website are protected by applicable copyright and trademark law.
                                </p>
                                <p>
                                    2. Use License
                                    <div className="indent">
                                        <p>
                                            1. Permission is granted to temporarily download one copy of the materials (information or software) on Equitytable, Inc.'s website for personal,
                                            non-commercial transitory viewing only. 
                                            This is the grant of a license, not a transfer of title, and under this license you may not:
                                                <div className="indent">
                                                    <p>1. modify or copy the materials;</p>
                                                    <p>2. use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</p>
                                                    <p>3. attempt to decompile or reverse engineer any software contained on Equitytable, Inc.'s website;</p>
                                                    <p>4. remove any copyright or other proprietary notations from the materials; or</p>
                                                    <p>5. transfer the materials to another person or "mirror" the materials on any other server.</p>
                                                </div>
                                        </p>
                                        <p>
                                            2. This license shall automatically terminate if you violate any of these restrictions and may be terminated by Equitytable, Inc. at any time. 
                                            Upon terminating your viewing of these materials or upon the termination of this license,
                                            you must destroy any downloaded materials in your possession whether in electronic or printed format.
                                        </p>
                                    </div>
                                </p>
                                <p>
                                    3. Disclaimer
                                    <div className="indent">
                                        <p>
                                            1. The materials on Equitytable, Inc.'s website are provided on an 'as is' basis. Equitytable, Inc. makes no warranties,
                                            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                                            fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                        </p>
                                        <p>
                                            2. Further, Equitytable, Inc. does not warrant or make any representations concerning the accuracy, likely results,
                                            or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                                        </p>
                                    </div>    
                                </p>
                                <p>
                                    4. Limitations
                                    In no event shall Equitytable, Inc. or its suppliers be liable for any damages (including, without limitation,
                                    damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Equitytable, Inc.'s website,
                                    even if Equitytable, Inc. or a Equitytable, Inc. authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties,
                                    or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                                </p>
                                <p>
                                    5. Accuracy of materials
                                    The materials appearing on Equitytable, Inc.'s website could include technical, typographical, or photographic errors.
                                    Equitytable, Inc. does not warrant that any of the materials on its website are accurate, complete or current.
                                    Equitytable, Inc. may make changes to the materials contained on its website at any time without notice.
                                    However Equitytable, Inc. does not make any commitment to update the materials.
                                </p>
                                <p>
                                    6. Links
                                    Equitytable, Inc. has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
                                    The inclusion of any link does not imply endorsement by Equitytable, Inc. of the site. 
                                    Use of any such linked website is at the user's own risk.
                                </p>
                                <p>
                                    7. Modifications
                                    Equitytable, Inc. may revise these terms of service for its website at any time without notice.
                                    By using this website you are agreeing to be bound by the then current version of these terms of service.
                                </p>
                                <p>
                                    8. Governing Law
                                    These terms and conditions are governed by and construed in accordance with the laws of Delaware
                                    and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </div>
                        </MDBTabPane>
                        <MDBTabPane className="black-text" tabId="2" role="tabpanel">
                            <div className="content scrollbar scrollbar-danger" style={{maxHeight:"75vh", overflow:"auto"}}>
                                <h3>Privacy Policy</h3>
                                <p>
                                    Your privacy is important to us. It is Equitytable, Inc.'s policy to respect your privacy regarding any information we may collect from you across our website,
                                    https://www.equitytable.com, and other sites we own and operate.
                                </p>
                                <p>
                                    We only ask for personal information when we truly need it to provide a service to you.
                                    We collect it by fair and lawful means, with your knowledge and consent. 
                                    We also let you know why we’re collecting it and how it will be used.
                                </p>
                                <p>
                                    We only retain collected information for as long as necessary to provide you with your requested service.
                                    What data we store, we’ll protect within commercially acceptable means to prevent loss and theft,
                                    as well as unauthorized access, disclosure, copying, use or modification.
                                </p>
                                <p>
                                    We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                                </p>
                                <p>
                                    Our website may link to external sites that are not operated by us. 
                                    Please be aware that we have no control over the content and practices of these sites,
                                    and cannot accept responsibility or liability for their respective privacy policies.
                                </p>
                                <p>
                                    You are free to refuse our request for your personal information,
                                    with the understanding that we may be unable to provide you with some of your desired services.
                                </p>
                                <p>
                                    Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.
                                    If you have any questions about how we handle user data and personal information, feel free to contact us.
                                </p>
                                <p>
                                    This policy is effective as of 1 January 2020.
                                </p>
                            </div>
                        </MDBTabPane>
                    </MDBTabContent>
                    <div className="text-center">
                        <MDBBtn className="button" outline color="transparent" onClick={() => { this._renderTOS() }}>Return to Sign Up</MDBBtn>
                    </div>
                </MDBContainer>
        )
    }

    render(){
        return (
            <div>

                { !this.state.showtos ? this._renderSignUpForm(): this._renderTermsOfService() }

            </div>
        );
    }
};

export default SignUpForm;
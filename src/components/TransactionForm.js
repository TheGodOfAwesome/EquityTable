import React, { Component } from 'react';
import axios from 'axios';
import auth from '../services/auth/initAuth';
import AutoComplete from './AutoComplete';
import LoadingSpinner from './LoadingSpinner';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBModalHeader } from 'mdbreact';
import './Forms.css';

class TransactionForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            asset: "",
            assetSymbol: "",
            price: 0,
            units: 0,
            loading: false,
            error: null
        }
    }

    _handleSubmit = (e, data) => {
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

    logValue = value => {
        console.log(value);
    };

    _renderTransactionsForm = () => {
        return(
            <MDBContainer className="form">
                <MDBRow>
                    <MDBCol md="12">
                    <MDBModalHeader
                        className='text-center'
                        titleClass='w-100 font-weight-bold'
                        style={{color:'black'}}
                    >
                        Add Transaction
                    </MDBModalHeader>
                    <form className="transactionForm" onSubmit={this._handleSubmit}>
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
                            <AutoComplete
                                label="Add your Asset Symbol or Name"
                                suggestions={[
                                    "Alligator",
                                    "Bask",
                                    "Crocodilian",
                                    "Death Roll",
                                    "Eggs",
                                    "Jaws",
                                    "Reptile",
                                    "Solitary",
                                    "Tail",
                                    "Wetlands"
                                ]}
                            />
                            <div className="text-center">
                                <h7 className="error-text">{this.state.error}</h7>
                            </div>
                        </div>
                        <br/>
                        <div className="text-center">
                        { 
                            this.state.loading
                            ? this._renderLoadingSpinner()
                            : <MDBBtn className="button" type="submit" value="Login">Add</MDBBtn>
                        }
                        </div>
                    </form>
                    </MDBCol>
                </MDBRow>
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

                { this._renderTransactionsForm()}

            </div>
        );
    }
};

export default TransactionForm;
import React, { Component, Fragment } from "react";
import { MDBCard, MDBInput } from 'mdbreact';
import Avatar from 'react-avatar';
import axios from 'axios';
import auth from '../services/auth/initAuth';
import PropTypes from "prop-types";
import debounce from 'lodash.debounce';

class AutoComplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        label: PropTypes.instanceOf(String)
    };

    static defaultProps = {
        suggestions: [],
        label:""
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // Whether or not a search has been complete
            searching: false,
            // What the user has entered
            userInput: ""
        };

        this.onChangeDebounced = debounce(this.onChangeDebounced, 2000)
    }

    
    onChangeDebounced = e => {
        // Delayed logic goes here

    }

    onChange = e => {
        var { suggestions } = this.props;
        var newSuggestions = [];
        const userInput = e.currentTarget.value;

        if (!this.state.searching) {
            this.setState({
                searching: true
            });
            axios
            .get(
                'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
                userInput  +'&apikey=' +
                process.env.REACT_APP_ALPHAVANTAGE_API_KEY
            )
            .then(result => {
                var matches = [];
                matches = result.data.bestMatches;
                matches.forEach(match => {
                    var newMatch = (match['1. symbol'] + ' - ' + match['2. name']).length > 20
                        ? (match['1. symbol'] + ' - ' + match['2. name']).substring(0, 20) + "..."
                        : match['1. symbol'] + ' - ' + match['2. name'];
                    newSuggestions.push(newMatch);
                });

                // Filter our suggestions that don't contain the user's input
                const filteredSuggestions = newSuggestions.filter(
                suggestion =>
                    suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
                );
        
                this.setState({
                    activeSuggestion: 0,
                    filteredSuggestions,
                    showSuggestions: true,
                    searching: false
                    // userInput: e.currentTarget.value
                });
                
            })
            .catch(error => {
                this.setState({
                    loading: !this.state.loading,
                    searching: false
                });
                console.log(error);
            });
        }
        this.setState({
            userInput: e.currentTarget.value
        });
        // Execute the debounced onChange method
        this.onChangeDebounced(e)
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
            return;
        }

        this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
            return;
        }

        this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                <MDBCard style={{ marginTop: "0rem", maxHeight:"450" }}>
                    <ul class="list-group" style={{"list-style-type": "none"}}>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                    // <li className={className} key={suggestion} onClick={onClick}>
                                    <li class="list-group-item list-group-item-default" key={suggestion} onClick={onClick} >
                                        <Avatar src=
                                            {process.env.PUBLIC_URL + "stock/"+ suggestion.split(' - ')[0] +".png"} 
                                            color={Avatar.getRandomColor('sitebase', [])}
                                            name={suggestion.split(' - ')[0].split('').join(' ')}
                                            size={25} 
                                            className="mx-auto mb-md-0 mb-4 rounded z-depth-0 img-fluid"
                                            style={{float: 'left'}}
                                        />
                                        &nbsp;
                                        {suggestion}
                                    </li>
                            );
                        })}
                    </ul>
                </MDBCard>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No matches!</em>
                    </div>
                );
            }
        }
        
        const { label } = this.props;

        return (
            <Fragment>
                <MDBInput
                    label={label}
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default AutoComplete;
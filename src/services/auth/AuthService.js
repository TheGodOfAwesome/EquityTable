import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
// import auth0 from 'auth0-js';
import axios from 'axios';
import ServiceConfig from '../ServiceConfig.js';

const userServiceUrl = ServiceConfig.ranxed_user_service_url;
const userServiceApiKey = ServiceConfig.ranxed_user_service_api_key;

export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super()
        // Configure Auth0
        // this.auth0 = new auth0.WebAuth({
        //     clientID: clientId,
        //     domain: domain,
        //     responseType: 'token id_token',
        //     redirectUri: `${window.location.origin}/`
        // })
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.getUser = this.getUser.bind(this)
        this.loginWithGoogle = this.loginWithGoogle.bind(this)
    }

    login(username, password) {
        this.auth0.client.login({
            realm: 'Username-Password-Authentication',
            username,
            password
        }, (err, authResult) => {
            if (err) {
                alert('Error: ' + err.description)
                return
            }
            if (authResult && authResult.idToken && authResult.accessToken) {
                this.setToken(authResult.accessToken, authResult.idToken)
                window.location = window.location.origin //redirect to main page
            }
        })
    }

    signup(email, username, password) {
        this.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            username,
            password,
        }, function (err) {
            if (err) {
                alert('Error: ' + err.description)
            }
        })
    }

    resetPassword(email) {
        this.auth0.changePassword({
            connection: 'Username-Password-Authentication',
            email: email
        }, function (err) {
            if (err) {
                alert('Error: ' + err.description)
            }
        })
    }
    
    loginWithGoogle() {
        this.auth0.authorize({
            connection: 'google-oauth2',
        })
    }

    parseHash(hash) {
        this.auth0.parseHash({
            hash
        }, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setToken(authResult.accessToken, authResult.idToken)
                console.log('AuthService parseHash : code to transition to /')
                this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
                    if (error) {
                        console.log('Error loading the Profile', error)
                    } else {
                        this.setProfile(profile)
                    }
                })
            } else if (authResult && authResult.error) {
                alert('Error: ' + authResult.error)
            }
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        if (!!token && !isTokenExpired(token) && !localStorage.getItem('user')) {
            this.getUserByEmail(this.getProfile().email, token);
        }
    
        if(!(!!token && !isTokenExpired(token))) {
            this.logout();
        }
        return !!token && !isTokenExpired(token) 
    }

    isLoggedIn() {
        // Checks if there is a saved token and it's still valid
        // var isLoggedIn = false
        // const token = this.getUserToken()
        // if (!token || !localStorage.getItem('token') || !localStorage.getItem('user')) {
        //     this.logout();
        // } else {
        //     isLoggedIn = true
        // }
        // return isLoggedIn

        var isLoggedIn = false
        if (
            localStorage.getItem('token') == null || localStorage.getItem('token') == '' || 
            localStorage.getItem('user') == null || localStorage.getItem('user').username == ''
        ) {
            this.logout();
        } else {
            isLoggedIn = true
        }
        return isLoggedIn;
    }

    isOrgsPage() {
        const org_id = this.getClan().clan_id
        const isOrgPage = window.location.href.includes("orgs/" + org_id);
        return isOrgPage;
    }

    setToken(accessToken, idToken) {
        // Saves user access token and ID token into local storage
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('id_token', idToken);
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile)
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
        // Triggers profile_updated event to update the UI
        this.emit('user_updated', user)
    }

    getUser() {
        // Retrieves the profile data from localStorage
        const user = localStorage.getItem('user')
        return user ? JSON.parse(localStorage.user) : {}
    }

    setUserToken(token) {
        localStorage.setItem('token', JSON.stringify(token))
        // Triggers profile_updated event to update the UI
        this.emit('token_updated', token)
    }

    getUserToken() {
        // Retrieves the profile data from localStorage
        const token = localStorage.getItem('token')
        return token ? JSON.parse(localStorage.token) : {}
    }

    setApiKey(apiKey) {
        localStorage.setItem('api_key', JSON.stringify(apiKey))
        // Triggers profile_updated event to update the UI
        this.emit('apiKey_updated', apiKey)
    }

    getApiKey() {
        // Retrieves the profile data from localStorage
        const apiKey = localStorage.getItem('api_key')
        return apiKey ? JSON.parse(localStorage.apiKey) : {}
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('api_key');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    resetState() {
        localStorage.setItem('reset_state', 'true');
    }

    reloadPage() {
        localStorage.setItem('reload_page', 'true');
    }

    getReloadPage() {
        return localStorage.getItem('reload_page');
    }

    clearReload() {
        localStorage.removeItem('reload_page');
    }

    shouldReloadPage() {
        let result = false;
        const reload = this.getReloadPage();
        if (reload === 'true') {
            result = true;
        }
        return result;
    }

    refreshUser() {
        this.getUserByEmail(this.getProfile().email, this.getToken());
        return this.getUser();
    }

    getUser(api_key, token) {
        // const url = 'https://ranxed-cors.herokuapp.com/' + userServiceUrl;
        const url = userServiceUrl;
        axios.get(
            url,
            {
                crossdomain: true,
                method: 'HEAD',
		        mode: 'no-cors',
                params: {
                    api_key: userServiceApiKey,
                    email: email
                },
                headers: { 
                    "X-Requested-With": "XMLHttpRequest" ,
                    "Authorization": id_token,
                    // "Access-Control-Allow-Origin": window.location.origin.toString(),
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                    "Content-Type": "application/json"   
                }
            }
        )
        .then(res => {
            // File uploaded successfully
            var response = res.data;
            if (response) {
                this.setUser(response);
            }
        })
        .catch(function (err) {
            console.error('err', err);
        });
    }
}
import React, { Component } from 'react';
import auth from './services/auth/initAuth';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Routes from './Routes';
import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
  MDBFooter,
  MDBIcon,
  MDBModal, MDBModalBody,
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem, MDBNavLink,
  MDBTooltip,
  MDBTreeview, MDBTreeviewList, MDBTreeviewItem
} from 'mdbreact';
import MenuModal from './components/MenuModal';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import './fonts/stylesheet.css';

class App extends Component {
  state = {
    collapseID: '',
    darkMode: false,
    isOpen: false,
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  
  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  switchMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  };

  logout = () => {
    auth.logout();
    window.location = window.location.origin //redirect to main page
  }

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;
    const { isOpen } = this.state;

    const darkMode = this.state.darkMode
      ? true
      : false;

    const bgColor = this.state.darkMode 
      ? 'black'
      : 'white';
      
    const fontColor = this.state.darkMode 
      ? 'white'
      : 'black';

    const navColor = this.state.darkMode 
      ? 'black'
      : 'white';

    return (
      <Router>
        <div className='flyout' style={{backgroundColor: bgColor}}>
          <MDBNavbar color={navColor} dark={darkMode} light={!darkMode} expand='md' fixed='top' scrolling className="z-depth-0">
            <MDBNavbarBrand href='/' className='py-0 font-weight-bold' style={{ color: fontColor }}>
              <strong className='align-middle' style={{fontFamily: "Assistant-Regular", fontWeight:"400", fontSize:"x-large"}}>equitytable</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
            <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/'
                    style={{ color: fontColor }}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {
                  (auth.isLoggedIn())
                  ?
                    <MDBNavItem>
                      <MDBDropdown style={{ color: fontColor }}>
                        <MDBDropdownToggle nav caret>
                          <div className='d-md-inline'><strong>Menu</strong></div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className='dropdown-default' left>
                          <MDBDropdownItem href='/'><MDBIcon icon='chart-line'/> Overview</MDBDropdownItem>
                          <MDBDropdownItem href='/watchlists'><MDBIcon icon='list-alt' far/> Watchlists</MDBDropdownItem>
                          <MDBDropdownItem href='/transactions'><MDBIcon icon='exchange-alt'/> Transactions</MDBDropdownItem>
                          <MDBDropdownItem href='/diversification'><MDBIcon icon='chart-pie'/> Diversification</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>
                  : <></>
                }
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/about'
                    style={{ color: fontColor }}
                  >
                    <strong>About</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/faqs'
                    style={{ color: fontColor }}
                  >
                    <strong>FAQs</strong>
                  </MDBNavLink>
                </MDBNavItem>

                {
                  auth.isLoggedIn() 
                  ?
                    <MDBNavItem>
                      <MDBNavLink
                        onClick={() => {this.logout()}}
                        to=''
                        style={{ color: fontColor }}
                      >
                        <strong>Log Out</strong>
                      </MDBNavLink>
                    </MDBNavItem>
                  :
                    <>
                      <MDBNavItem>
                        <MDBNavLink
                          onClick={this.toggle(3)}
                          to='#'
                          rel='noopener noreferrer'
                          style={{ color: fontColor }}
                        >
                          <strong>Sign In</strong>
                        </MDBNavLink>
                      </MDBNavItem>

                      <MDBNavItem>
                        <MDBNavLink
                          onClick={this.toggle(4)}
                          to='#'
                          rel='noopener noreferrer'
                          style={{ color: fontColor }}
                        >
                          <strong>Sign Up</strong>
                        </MDBNavLink>
                      </MDBNavItem> 
                    </>
                }

                <MDBNavItem className='mr-2'>
                  <MDBTooltip
                    placement='bottom'
                    domElement
                    style={{ display: 'block' }}
                  >
                    <a
                      className='nav-link Ripple-parent'
                      onClick={this.toggle(1)}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ "font-size": "small", marginTop: '0.1rem', color: fontColor }}
                    >
                      <strong>
                        <MDBIcon icon='question-circle' />
                      </strong>
                    </a>
                    <span>Support</span>
                  </MDBTooltip>
                </MDBNavItem>
                <MDBNavItem className='mr-2'>
                  <MDBTooltip
                    placement='bottom'
                    domElement
                    style={{ display: 'block' }}
                  >
                    <a
                      className='nav-link Ripple-parent'
                      onClick={this.toggle(2)}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ "font-size": "small", marginTop: '0.1rem', color: fontColor }}
                    >
                      <strong>
                        <MDBIcon icon='cog' />
                      </strong>
                    </a>
                    <span>Settings</span>
                  </MDBTooltip>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBTooltip
                    placement='bottom'
                    domElement
                    style={{ display: 'block' }}
                  >
                    <a
                      className='nav-link Ripple-parent'
                      onClick={() => { this.switchMode() }}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ "font-size": "small", marginTop: '0.1rem', color: fontColor }}
                    >
                      <MDBIcon icon="moon"/>
                    </a>
                    <span>Dark Mode: {this.state.darkMode ? 'ON' : 'OFF'}</span>
                  </MDBTooltip>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          
          <main style={{marginTop: '4rem', darkMode: this.state.darkMode, backgroundColor: bgColor, color: fontColor}}>
            <Routes />
          </main>

          <MDBFooter color={bgColor}>
            <p className='footer-copyright mb-0 py-3 text-center' style={{color: fontColor, backgroundColor: navColor}}>
              &copy; {new Date().getFullYear()} Copyright:
              <a href='https://www.equitytable.co' style={{color: fontColor}}> equitytable.co </a>
            </p>
          </MDBFooter>

          <MDBContainer>
            <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} side position="top-left">
              <MDBModalBody toggle={this.toggle(1)}  className="form" style={{minheight: '98vh'}}>
                <MenuModal/>
                <MDBBtn className='justify-content-center align-items-center' color='black' onClick={this.toggle(1)} style={{float: 'right'}}>
                  Close
                  <MDBIcon icon='times' className='ml-1' />
                </MDBBtn>
              </MDBModalBody>
            </MDBModal>
            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} side position="top-right">
              <MDBModalBody toggle={this.toggle(2)}  className="form">
                <div>
                  <h1>Settings</h1>
                </div>
              </MDBModalBody>
            </MDBModal>
            <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} side position="top-right">
              <SignInForm/>
            </MDBModal>
            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} side position="top-right">
              <SignUpForm/>
            </MDBModal>
          </MDBContainer>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { MDBTreeview, MDBTreeviewList, MDBTreeviewItem } from 'mdbreact';

class MenuModal extends Component {
    render(){
        const fontColor = 'black';
        return (
            <div>
                <div className='justify-content-center align-items-center'>
                        <MDBTreeview
                            className='w-20'
                            theme='animated'
                            header='Menu'
                            openOnToggler
                            getValue={value => console.log(value)}
                            style={{width: '100%', "font-size": "large", color: fontColor}}
                        >
                            <h3>
                                <a href='/' style={{color: fontColor, padding: '1rem'}}>
                                    <MDBTreeviewItem icon='chart-line' title='Overview'/>
                                </a>
                                <a href='/watchlists' style={{color: fontColor, padding: '1rem'}}>
                                    <MDBTreeviewItem icon='list-alt' far title='Watchlists'/>
                                </a>
                                <a href='/transactions' style={{color: fontColor, padding: '1rem'}}>
                                    <MDBTreeviewItem icon='exchange-alt' title='Transactions'/>
                                </a>
                                <a href='/diversification' style={{color: fontColor, padding: '1rem'}}>
                                    <MDBTreeviewItem icon='chart-pie' title='Diversification' />
                                </a>
                                <a style={{color: fontColor, padding: '1rem'}}>
                                    <MDBTreeviewItem icon='sliders-h' title='Settings' />
                                </a>
                                <a style={{color: fontColor, paddingTop: '1rem', paddingBottom:'0.5rem'}}>
                                    <MDBTreeviewItem icon='question-circle' far title='Support' />
                                </a>
                            </h3>
                        </MDBTreeview>
                </div>
            </div>
        );
    }
};

export default MenuModal;
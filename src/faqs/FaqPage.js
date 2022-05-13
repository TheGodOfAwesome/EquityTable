import React, { Component } from 'react';
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBAnimation
} from 'mdbreact';

export class FaqPage extends Component {
  componentWillMount () {

  }

  render() {
      return (
        <>
          <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
          <MDBAnimation type='zoomIn' duration='500ms'>
            <MDBContainer>
              <MDBRow>
                <MDBCol md='8' className='mt-3 mx-auto'>
                  <MDBJumbotron>
                    <h1 className='text-center'>
                      <MDBIcon icon='bars' className='indigo-text mr-2' />
                      FAQs
                    </h1>
                  </MDBJumbotron>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBAnimation>
        </>
      )
  }
}

export default FaqPage;

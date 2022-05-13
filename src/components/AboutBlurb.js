import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import stocks from '../assets/imgs/stocks.png';
import cryptos from '../assets/imgs/cryptos.png';
import stocksandcryptos from '../assets/imgs/stocksandcryptos.png';

const AboutBlurb = () => {
  return (
    <MDBContainer className="m-12 text-center align-middle" style={{paddingTop:"2em"}}>
        <MDBRow>
            <MDBCol md="4" className="mb-md-0 mb-5">
                <img
                    tag="img"
                    src={stocks}
                    className="rounded img-fluid"
                    alt="stocks"
                    style={{maxHeight:'300px'}}
                />
                <h4 className="font-weight-bold dark-grey-text my-4">
                    Stocks
                </h4>
                <h6 className="grey-text mb-3">Monitor all your US Stocks</h6>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0 mb-5">
                <img
                    tag="img"
                    src={cryptos}
                    className="rounded img-fluid"
                    alt="crypto"
                    style={{maxHeight:'300px'}}
                />
                <h4 className="font-weight-bold dark-grey-text my-4">
                    Cryptos
                </h4>
                <h6 className="grey-text mb-3">Monitor all your Cryptocurrency assets</h6>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0 mb-5">
                <img
                    tag="img"
                    src={stocksandcryptos}
                    className="rounded img-fluid"
                    alt="stocks and cryptos"
                    style={{maxHeight:'300px'}}
                />
                <h4 className="font-weight-bold dark-grey-text my-4">
                    All in one application
                </h4>
                <h6 className="grey-text mb-3">Monitor all your stocks and cryptos in one simple interface</h6>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  );
}

export default AboutBlurb;
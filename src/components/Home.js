import React, { Component } from 'react';
import {
  MDBBtn,
  MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardHeader, MDBCardFooter, MDBCardTitle, MDBCardText,
  MDBContainer,
  MDBCol,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
  MDBIcon,
  MDBListGroup, MDBListGroupItem,
  MDBModal, MDBModalBody,
  MDBRow,
  MDBTooltip
} from 'mdbreact';
import './Home.css';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/amber-dark.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';
import '@inovua/reactdatagrid-community/index.css';
import '../assets/meta-dark.css';

import { TypeChooser } from "react-stockcharts/lib/helper";
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

import { getData } from '../components/charts/utils';
import { readData } from '../components/charts/utils';
import AreaChart from '../components/charts/AreaChart';
import CandlestickChart from '../components/charts/CandlestickChart';
import HeikinAshiChart from '../components/charts/HeikinAshiChart';
import SectionContainer from '../components/sectionContainer';
import MenuModal from '../components/MenuModal';
import TradeviewChart from '../components/TradeviewChart';
import TransactionForm from '../components/TransactionForm';

import Avatar from 'react-avatar';
import waves_inverse from '../assets/imgs/waves_inverse.png';
import beach from '../assets/imgs/beach.png';

const headerStyle = {
  border: "none",
  border : 0
}

const columns = [
  // { name: 'uniqueId', header: 'Id', defaultFlex: 1, maxWidth: 70},
  { name: 'logo', header: ''/*<MDBIcon icon='image' fas size='1x' />*/, defaultFlex: 1, maxWidth: 100, textAlign: 'center', headerProps: { style: headerStyle}},
  // { name: 'name', header: 'Name', defaultFlex: 1, maxWidth: 160},
  // { name: 'symbol', header: 'Symbol', defaultFlex: 1, maxWidth: 100},
  {
    name: 'fullName',
    header: 'Asset',
    defaultFlex: 1, maxWidth: 160,
    render: ({ data }) => <div><h6 style={{ color: 'inherit'}}><strong>{data.symbol}</strong></h6><h11>{data.name}</h11></div>
  },
  { name: 'value', header: 'Value', defaultFlex: 1, maxWidth: 140},
  { name: 'position', header: 'Position', defaultFlex: 1, maxWidth: 100},
  { name: 'price', header: 'Price / Unit', defaultFlex: 1, maxWidth: 140},
  { name: 'chart', header: 'Graph', defaultFlex: 1, maxWidth: 240},
  { name: 'gain', header: 'Loss/Gain %', defaultFlex: 1, maxWidth: 140, type: 'number', textAlign: 'right',
    onRender: (cellProps, {data}) => {
      // cellProps.style.background = data.gain < 50 ? '#f70221': '#56b45d'
      cellProps.style.color = '#ffffff'
      cellProps.style.color = data.gain < 50 ? '#f70221': '#56b45d'
      cellProps.style.fontWeight = 1000
    }
    // ,
    // cellProps: {
    //   style: { fontWeight: 1200 }
    // }
  },
  { name: 'income', header: 'Dividend/APY', defaultFlex: 1, textAlign: 'right', paddingRight:100}
]

var cellChart = null;
var assetLogo = null;

var dataSource = [
  { uniqueId: 11, logo: assetLogo, name: 'Bitcoin', symbol: 'BTC', value: '$100', position: 0.002, price:'$54000', chart: cellChart, gain: 99, income: 8, type: 'crypto' },
  { uniqueId: 1, logo: assetLogo, name: 'Apple', symbol: 'AAPL', value: '$100', position: 35, price:'$1.34', chart: cellChart, gain: 61, income: 61, type: 'stock' },
  { uniqueId: 2, logo: assetLogo, name: 'Google A', symbol: 'GOOGL', value: '$1000', position: 25, price:'$1.34', chart: cellChart, gain: 22, income: 22, type: 'stock' },
  { uniqueId: 3, logo: assetLogo, name: 'Microsoft', symbol: 'MSFT', value: '$1000', position: 27, price:'$1.34', chart: cellChart, gain: 53, income: 53, type: 'stock' },
  { uniqueId: 4, logo: assetLogo, name: 'Tesla', symbol: 'TSLA', value: '$1000', position: 81, price:'$1.34', chart: cellChart, gain: 24, income: 24, type: 'stock' },
  { uniqueId: 5, logo: assetLogo, name: 'Google B', symbol: 'GOOG', value: '$1000', position: 18, price:'$1.34', chart: cellChart, gain: 85, income: 85, type: 'stock' },
  { uniqueId: 6, logo: assetLogo, name: 'Netflix', symbol: 'NFLX', value: '$1000', position: 18, price:'$1.34', chart: cellChart, gain: 26, income: 26, type: 'stock' },
  { uniqueId: 7, logo: assetLogo, name: 'Palantir', symbol: 'PLTR', value: '$1000', position: 54, price:'$1.34', chart: cellChart, gain: 77, income: 77, type: 'stock' },
  { uniqueId: 8, logo: assetLogo, name: 'Amazon', symbol: 'AMZN', value: '$1000', position: 54, price:'$1.34', chart: cellChart, gain: 28, income: 28, type: 'stock' },
  { uniqueId: 9, logo: assetLogo, name: 'Robinhood', symbol: 'HOOD', value: '$1000', position: 40, price:'$1.34', chart: cellChart, gain: 99, income: 99, type: 'stock' },
  { uniqueId: 10, logo: assetLogo, name: 'Taiwanese Semiconductor Co.', symbol: 'TSM', value: '$300', position: 100, price:'0.002', chart: cellChart, gain: 99, income: 84, type: 'stock' },
  { uniqueId: 10, logo: assetLogo, name: 'Cardano', symbol: 'ADA', value: '$100', position: 0.002, price:'$2.22', chart: cellChart, gain: 99, income: 8, type: 'crypto' },
]

const gridStyle = { 
  border: "none",
  minHeight: '100vh'
}

function boxMullerRandom () {
  let phase = false,
      x1, x2, w, z;

  return (function() {

      if (phase = !phase) {
          do {
              x1 = 2.0 * Math.random() - 1.0;
              x2 = 2.0 * Math.random() - 1.0;
              w = x1 * x1 + x2 * x2;
          } while (w >= 1.0);

          w = Math.sqrt((-2.0 * Math.log(w)) / w);
          return x1 * w;
      } else {
          return x2 * w;
      }
  })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            filteredTable: false,
            tableFilter: '',
            showMoreCards: false,
            selected: null,
            selectedData: null
        };
    }

    componentDidMount() {
        this.state = {
            modal1: false,
            modal2: false,
            modal3: false,
            chartType: 'area'
        };

        readData().then(
        // getData("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo&datatype=csv").then(
        // getData("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv").then(
        areaChartData => {
            // getData("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo&datatype=csv").then(
            // getData("https://raw.githubusercontent.com/TheGodOfAwesome/dummydata/main/MSFT.tsv").then(
            readData().then(
            tableData => { 
                // getData("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv").then(data => {
                readData().then(data => {
                // getData("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo&datatype=csv").then(data => { 
                this.setState({
                    areaChartData,
                    tableData,
                    data,
                    showMoreCards: false,
                    chartType: 'area',
                    filteredTable: false,
                    tableFilter: ''
                })
                }) 
            }
            )
        }
        )
        }

    scrollToTop = () => window.scrollTo(0, 0);
    
    handleSelectionChange = (e) => {
        if (e && e.selected) {
        console.log(e); 
        const selected = e.selected;
        const selectedData = e.data;
        this.setState({
            selected: selected,
            selectedData: selectedData
        });
        }
    }
    
    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    showMoreOrLessCards = () => {
        this.setState({
            showMoreCards: !this.state.showMoreCards
        });
    };  

    render() {
        const bgColor = '#1b1b1d';
        // const bgColor = 'white';
        const fontColor = 'black';

        let filteredDataSource = dataSource
        if (this.state.filteredTable && this.state.tableFilter == 'crypto') {
            filteredDataSource = filteredDataSource.filter(row => row.type == "crypto")
        } else if (this.state.filteredTable && this.state.tableFilter == 'stock') {
            filteredDataSource = filteredDataSource.filter(row => row.type == "stock")
        } else if (!this.state.filteredTable && this.state.tableFilter == '') {
            filteredDataSource = dataSource;
        }

        if (this.state == null) {
                return <div>Loading...</div>
            }

        let chart = null
        if (this.state.chartType == 'default') {
            chart = <TradeviewChart/>
        } else if (this.state.chartType == 'area') {
            chart = <AreaChart type={TypeChooser} data={this.state.areaChartData} />
        } else if (this.state.chartType == 'candlestick') {
            chart = <CandlestickChart type={TypeChooser} data={this.state.areaChartData}/>
        } else if (this.state.chartType == 'heikinAshi'){
            chart = <HeikinAshiChart type={TypeChooser} data={this.state.areaChartData} />
        }

        return (
        <>
            <div className='mt-3 mb-5' style={{overflowX: 'hidden'}}>

            <MDBContainer>
                <MDBRow  style={{paddingTop:'20px'}}>
                {/* <MDBCol sm='2'></MDBCol> */}
                <MDBCol sm='2'>
                    <a>
                    <p onClick={this.toggle(1)}><MDBIcon icon="indent"/> MENU</p>
                    </a>
                </MDBCol>
                <MDBCol sm='2'>
                    <a>
                    <p onClick={this.toggle(10)}><MDBIcon icon="plus"/> Add Asset</p>
                    </a>
                </MDBCol>
                <MDBCol sm='2'>
                    <a>
                    <p onClick={this.toggle(10)}><MDBIcon icon="exchange-alt"/> Add Transaction</p>
                    </a>
                </MDBCol>
                <MDBCol sm='2'>
                    <a>
                    <p onClick={this.toggle(10)}><MDBIcon fas icon="wallet"/> Update Balance</p>
                    </a>
                </MDBCol>
                <MDBCol sm='2'>
                    <a>
                    <p onClick={this.toggle(9)}><MDBIcon fas icon="archive"/> Add Source</p>
                    </a>
                </MDBCol>
                <MDBCol sm='2'>
                    <a>
                    <p onClick={this.toggle(9)}><MDBIcon fas icon="shopping-cart"/> Buy/Trade Crypto</p>
                    </a>
                </MDBCol>
                </MDBRow>
                <SectionContainer header='' noBorder style={{color: 'black'}}>
                <MDBCardGroup deck>
                <MDBCard
                    className='card-image'
                    style={{
                    backgroundImage:
                        "url("+ waves_inverse +")"
                    }}
                >
                    <MDBCardBody>
                    <MDBCardTitle tag='h5'><MDBIcon icon="money-bill-wave-alt" size='sm'/> Cash Balance 
                        <MDBTooltip placement=''>
                        <MDBIcon icon="info-circle" style={{ "font-size": "small", float:'right', paddingTop:'3px'}}/>
                        <div>
                            This is a wider panel with supporting.
                        </div>
                        </MDBTooltip>
                    </MDBCardTitle>
                    <MDBCardText>
                        <h3 style={{color:'green'}}>$0.00</h3>
                    </MDBCardText>
                    <MDBCardText small muted>
                        Last updated 3 mins ago
                    </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                    {/* <MDBCard  >
                    <MDBCardBody>
                        <MDBCardTitle tag='h5'><MDBIcon icon="money-bill-wave-alt" size='sm'/> Cash Balance 
                        <MDBTooltip placement=''>
                            <MDBIcon icon="info-circle" style={{ "font-size": "small", float:'right', paddingTop:'3px'}}/>
                            <div>
                            This is a wider panel with supporting.
                            </div>
                        </MDBTooltip>
                        </MDBCardTitle>
                        <MDBCardText>
                        <h3 style={{color:'green'}}>$0.00</h3>
                        </MDBCardText>
                        <MDBCardText small muted>
                        Last updated 3 mins ago
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard> */}
                    <MDBCard
                    className='card-image'
                    style={{
                        backgroundImage:
                        "url("+ waves_inverse +")"
                    }}
                    >
                    <MDBCardBody>
                        <MDBCardTitle tag='h5'><MDBIcon icon="chart-area"/> Amount Invested 
                        <MDBTooltip placement=''>
                            <MDBIcon icon="info-circle" style={{ "font-size": "small", float:'right', paddingTop:'3px'}}/>
                            <div>
                            This is a wider panel with supporting.
                            </div>
                        </MDBTooltip>
                        </MDBCardTitle>
                        <MDBCardText>
                        <h3 style={{color:'green'}}>$0.00</h3>
                        </MDBCardText>
                        <MDBCardText small muted>
                        Last updated 3 mins ago
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                    <MDBCard
                    className='card-image'
                    style={{
                        backgroundImage:
                        "url("+ waves_inverse +")"
                    }}
                    >
                    <MDBCardBody>
                        <MDBCardTitle tag='h5'><MDBIcon icon="chart-line"/> Gain or Loss 
                        <MDBTooltip placement=''>
                            <MDBIcon icon="info-circle" style={{ "font-size": "small", float:'right', paddingTop:'3px'}}/>
                            <div>
                            This is a wider panel with supporting.
                            </div>
                        </MDBTooltip>
                        </MDBCardTitle>
                        <MDBCardText>
                        <h3 style={{color:'green'}}>0.00% <MDBIcon icon='caret-up'/></h3>
                        </MDBCardText>
                        {/* <MDBCardText small muted> */}
                        <Sparklines data={Array.apply(0, Array(20)).map(boxMullerRandom)} limit={20}>
                            <SparklinesLine color="#000000"  style={{ stroke: "none", fill: "#000000", fillOpacity: "0.9" }}/>
                            <SparklinesSpots />
                        </Sparklines>
                        {/* </MDBCardText> */}
                    </MDBCardBody>
                    </MDBCard>
                    <MDBCard
                        className='card-image'
                        style={{
                            backgroundImage:
                            "url("+ waves_inverse +")"
                        }}
                    >
                    <MDBCardBody>
                        <MDBCardTitle tag='h5'><MDBIcon icon="percent" style={{ "font-size": "medium"}}/> Dividends & Interest 
                        <MDBTooltip placement=''>
                            <MDBIcon icon="info-circle" style={{ "font-size": "small", float:'right', paddingTop:'3px'}}/>
                            <div>
                                This is a wider panel with supporting.
                            </div>
                        </MDBTooltip>
                        </MDBCardTitle>
                        <MDBCardText>
                        <h3 style={{color:'red'}}>0.00% <MDBIcon icon='caret-down'/></h3>
                        </MDBCardText>
                        <MDBCardText small muted>
                            Last updated 3 mins ago
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCardGroup>

                {/* Add a collpsible view for the next three cards */}

                {
                    (this.state.showMoreCards) ?
                    <MDBCardGroup deck className='mt-4'>
                    <MDBCard  >
                        <MDBCardBody>
                        <MDBCardTitle tag='h5'>Biggest Gainers</MDBCardTitle>
                        <MDBCardText>
                            <MDBListGroup className='scrollbar scrollbar-primary m-auto scrollbar scrollbar-primary' style={{maxHeight:'100px', overflowY: 'scroll'}}>
                                <MDBListGroupItem>{this.state.chartType}</MDBListGroupItem>
                                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem> 
                                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
                                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter small muted>
                        Last updated 3 mins ago
                        </MDBCardFooter>
                    </MDBCard>
                    <MDBCard  >
                        <MDBCardBody>
                        <MDBCardTitle tag='h5'>Biggest Losers</MDBCardTitle>
                        <MDBCardText>
                            <MDBListGroup className='scrollbar scrollbar-black' style={{maxHeight:'100px', overflowY: 'scroll'}}>
                            <MDBListGroupItem>{this.state.chartType}</MDBListGroupItem>
                            <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                            <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem> 
                            <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                            <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                            <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
                            <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                            <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter small muted>
                        Last updated 3 mins ago
                        </MDBCardFooter>
                    </MDBCard>
                    <MDBCard /*style={{backgroundColor: bgColor}}*/>
                        <MDBCardBody>
                        <MDBCardTitle tag='h5'>Transactions</MDBCardTitle>
                        <MDBCardText style={{maxHeight:'100px', overflowY: 'scroll'}}>
                            This is a wider panel with supporting text below as a natural
                            lead-in to additional content. This panel has even longer
                            content than the first to show that equal height action.
                        </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter small muted>
                        Last updated 3 mins ago
                        </MDBCardFooter>
                    </MDBCard>
                    </MDBCardGroup>
                    :<></>
                }
                <MDBRow>
                    <MDBCol>
                    <a style={{float: 'right'}} onClick={() => this.showMoreOrLessCards()}>
                        <p>
                        {
                            (this.state.showMoreCards) 
                            // ? <p>Show Less <MDBIcon icon="caret-up"/></p> : <p>Show More <MDBIcon icon="caret-down"/></p>
                            ? <MDBBtn color='black' floating size='sm'>Show Less <MDBIcon icon='caret-up' size="lg"/></MDBBtn>
                            : <MDBBtn color='black' floating size='sm'>Show More <MDBIcon icon='caret-down' size="lg"/></MDBBtn>
                        }
                        </p>
                    </a>
                    </MDBCol>
                </MDBRow>
                </SectionContainer>
            </MDBContainer>

            {
                (this.state.selected == null) 
                ? <></>
                : <MDBContainer style={{color: fontColor}}>
                    <SectionContainer noBorder>
                        <MDBCard  >
                        <MDBRow>
                            <MDBCol className='text-left'  >
                            <MDBContainer>  
                                <div style={{paddingTop:"1em", paddingRight:"1em"}}>
                                <a style={{float: 'right'}} onClick={() => this.setState({selected:null})}>
                                    <MDBIcon icon="times" size="lg"/>
                                </a>
                                </div>
                            </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className='mb-4' style={{paddingTop:'50px', paddingLeft:'50px', paddingBottom:'50px'}}>
                            <MDBCol sm='4' style={{paddingRight:'50px', paddingBottom:'30px'}}>
                            <MDBRow>
                                <MDBCol>
                                <MDBRow>
                                    <MDBCol md='3'>
                                    <Avatar src=
                                        {
                                        (this.state.selectedData.type == 'stock')
                                            ? process.env.PUBLIC_URL + "stock/"+this.state.selectedData.symbol+".png"
                                            : process.env.PUBLIC_URL + "crypto/"+this.state.selectedData.symbol.toLowerCase()+".png"
                                        } 
                                        color={Avatar.getRandomColor('sitebase', [])}
                                        name={this.state.selectedData.symbol.split('').join(' ')}
                                        size={(this.state.selectedData.type == 'crypto')?40:45} 
                                        className="mx-auto mb-md-0 mb-4 rounded z-depth-0 img-fluid"
                                        unstyled={true}
                                        style={{float: 'center'}}
                                    />
                                    </MDBCol>
                                    <MDBCol><h3 style={{textAlign: 'left', float: 'left'}}> {this.state.selectedData.name}</h3></MDBCol>
                                </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBCard  >
                                <MDBListGroup style={{maxHeight:'400px', overflowY: 'scroll'}}>
                                <MDBListGroupItem>{this.state.selectedData.symbol}</MDBListGroupItem>
                                <MDBListGroupItem>{this.state.selectedData.value}</MDBListGroupItem>
                                <MDBListGroupItem>{this.state.selectedData.price}</MDBListGroupItem> 
                                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
                                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCard>
                            </MDBCol>
                            <MDBCol sm='8' className='text-center'>
                            <MDBContainer>
                                <MDBRow>
                                <MDBCol>
                                    <MDBDropdown size='sm'>
                                    <MDBDropdownToggle caret color='black'>
                                        Chart Type
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu right>
                                        <MDBDropdownItem onClick={() => this.setState({chartType:'default'})}>Default</MDBDropdownItem>
                                        <MDBDropdownItem onClick={() => this.setState({chartType:'area'})}>Area</MDBDropdownItem>
                                        <MDBDropdownItem onClick={() => this.setState({chartType:'candlestick'})}>Candlestick</MDBDropdownItem>
                                        <MDBDropdownItem onClick={() => this.setState({chartType:'heikinAshi'})}>HeikinAshi</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBCol>
                                {/* <MDBCol sm='1' className='text-left'>
                                    <a style={{float: 'left'}} onClick={() => this.setState({chartType:'area'})}>
                                    <MDBIcon fas icon="expand" size="lg"/>
                                    </a>
                                </MDBCol> */}
                                </MDBRow> 
                            </MDBContainer>
                            {chart}
                            </MDBCol>
                        </MDBRow>
                        </MDBCard>
                    </SectionContainer>
                </MDBContainer>
            }

            <MDBContainer>
                {
                dataSource.forEach(
                    row => {
                            const imgPath = row.type == 'stock' 
                            ? "stock/"+row.symbol+".png" 
                            : "crypto/"+row.symbol.toLowerCase()+".png";
                            
                            row.logo =
                            <Avatar src={process.env.PUBLIC_URL + imgPath} color={Avatar.getRandomColor('sitebase', [])}
                                name={row.symbol.split('').join(' ')} size={45} className="mx-auto mb-md-0 mb-4 rounded z-depth-0 img-fluid"
                                // round={true} 
                                unstyled={true}
                            />

                            if (row.uniqueId % 2 == 0) {
                            row.chart = 
                                <Sparklines data={Array.apply(0, Array(30)).map(boxMullerRandom)} /*height={29}*/>
                                <SparklinesLine style={{ stroke: "none", fill: "#f70221", fillOpacity: "0.8" }} />
                                </Sparklines>
                            } else {
                            row.chart = 
                                <Sparklines data={Array.apply(0, Array(30)).map(boxMullerRandom)} /*height={29}*/>
                                <SparklinesLine style={{ stroke: "none", fill: "#56b45d", fillOpacity: "1" }} />
                                </Sparklines>
                            }
                        }
                )
                }
                
                <MDBRow>
                    <MDBCol>             
                        <MDBDropdown size='sm'>
                        <MDBDropdownToggle caret color='black' style={{float:'right'}}>
                            {
                            (this.state.tableFilter === '') ? 'All' : this.state.tableFilter
                            }
                        </MDBDropdownToggle>
                        <MDBDropdownMenu right>
                            <MDBDropdownItem onClick={() => this.setState({tableFilter:'', filteredTable:false})}>All</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({tableFilter:'crypto', filteredTable:true})}>Crypto</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({tableFilter:'stock', filteredTable:true})}>Stocks</MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBCol>
                </MDBRow>
                
                <SectionContainer noBorder>
                    <MDBCard>
                        {/* <p className='text-center text-muted'>
                        Selected row id: {this.state.selected == null ? 'none' : JSON.stringify(this.state.selectedData.name)}.
                        </p>  */}
                        <ReactDataGrid
                        style={gridStyle}
                        rowHeight={60}
                        idProperty="uniqueId"
                        columns={columns}
                        showEmptyRows={false}
                        showHoverRows={false}
                        showZebraRows={false}
                        showCellBorders={false}
                        dataSource={filteredDataSource}
                        pagination
                        defaultLimit={100}
                        enableSelection={true}
                        onSelectionChange={this.handleSelectionChange}
                        // theme={'default-light'}
                        // theme = {'amber-dark'}
                        theme={(bgColor == 'black')?'default-dark':'default-light'}
                        // theme={'meta-dark'}
                        />
                    </MDBCard>
                </SectionContainer>
            </MDBContainer>

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
                <MDBModal isOpen={this.state.modal9} toggle={this.toggle(9)}>
                    <MDBModalBody toggle={this.toggle(9)} className="form">
                        <div style={{height: '450px'}}>
                            <iframe width="100%" height="100%" frameborder='none' src="https://widget.changelly.com?from=*&to=*&amount=0.01&address=&fromDefault=btc&toDefault=eth&theme=default&merchant_id=GhsxSocsDhC17_Wp&payment_id=&v=3">Can't load widget</iframe>
                        </div>
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </MDBModalBody>
                </MDBModal>
                <MDBModal isOpen={this.state.modal10} toggle={this.toggle(10)} side position="top-left">
                    <MDBModalBody toggle={this.toggle(10)}  className="form" style={{minheight: '98vh'}}>
                        <TransactionForm/>
                        <MDBBtn className='justify-content-center align-items-center' color='black' onClick={this.toggle(10)} style={{float: 'right'}}>
                            Close
                            <MDBIcon icon='times' className='ml-1' />
                        </MDBBtn>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
            </div>
        </>
        );
    }
}

export default Home;
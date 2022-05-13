import React, { Component } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

class TradeviewChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    componentDidMount() {
        // new TradingView.widget(
        //     {
        //         "width": 980,
        //         "height": 610,
        //         "symbol": "NYSE:TSM",
        //         "interval": "D",
        //         "timezone": "Etc/UTC",
        //         "theme": "light",
        //         "style": "1",
        //         "locale": "en",
        //         "toolbar_bg": "#f1f3f6",
        //         "enable_publishing": false,
        //         "allow_symbol_change": true,
        //         "container_id": "tradingview_20033"
        //     });
    }

    render(){
        return (
            // <div class="tradingview-widget-container">
            //     <div id="tradingview_20033"></div>
            //     <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
            // </div>
            <TradingViewWidget
                symbol="NASDAQ:AAPL"
                theme={Themes.LIGHT}
                // theme={Themes.DARK}
                locale="en"
                autosize
            />
        );
    }
};

export default TradeviewChart;
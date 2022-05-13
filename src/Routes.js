import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import FaqPage from './faqs/FaqPage';
import WatchlistPage from './watchlists/WatchlistPage';
import TransactionPage from './transactions/TransactionPage';
import DiversificationPage from './diversification/DiversificationPage';

import SectionContainer from './components/sectionContainer';

class Routes extends React.Component {
  render() {
    return (
      <Switch>    
        <Route exact path='/' component={HomePage} />
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/faqs' component={FaqPage} />
        <Route exact path='/watchlists' component={WatchlistPage} />
        <Route exact path='/transactions' component={TransactionPage} />
        <Route exact path='/diversification' component={DiversificationPage} /> 

        <Route
          render={function() {
            return <SectionContainer noBorder style={{height:'100vh'}}> <h1>Not Found</h1>; </SectionContainer>
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

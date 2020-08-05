import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
          <Checkout />
        </Layout>
      </div>
    );
  }
  
} // end of Class declaration

export default App;

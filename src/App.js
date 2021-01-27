import { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import ENavbar from './Elements/ENavbar';
import CCLoginPage from './ClassComponents/CCLoginPage';
import CCShopPage from './ClassComponents/CCShopPage';
import CCThankYou from './ClassComponents/CCThankYou';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromLoginPage: '',
      inputId2ThankYou: '',
      products2ThankYou:''
    }

  }
  getDateFromShopPage = (id,products) => {
    this.setState({
      inputId2ThankYou: id,
      products2ThankYou: products
    })
  }
  getDateFromLoginPage =  (data) => {
     this.setState({
      dataFromLoginPage: data
    });
  }
  render() {
    return (
      <div>
        {ENavbar}
        <Switch>
          <Route exact path="/" >
            <CCLoginPage sendData2Parent={this.getDateFromLoginPage} />
          </Route>
          <Route path="/CCShopPage">
            <CCShopPage data={this.state.dataFromLoginPage} sendData2Parent={this.getDateFromShopPage} />
          </Route>
          <Route path="/CCThankYou">
            <CCThankYou id={this.state.inputId2ThankYou} products={this.state.products2ThankYou} Name={this.state.dataFromLoginPage.inputName}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

{/* <Route path="/FCCreateNewRecipe">
                                    <FCCreateNewRecipe />      ------------------->  thank you page
                                  </Route> */}

export default withRouter(App);
import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import firebase from './firebase';


import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Header from './components/Header';
import New from './components/New';
import './global.css';

class App extends Component{

  state = {
    firebasenInitialized: false
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      // Devolve o usuario
      this.setState({firebasenInitialized: resultado});
    })
  }

  render(){
    return this.state.firebasenInitialized !== false ?(
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard/new" component={New}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    ); 
  }
}
export default App;

import React, {Component} from 'react';
import {Link, WithRouter, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';
import  logo from './assets/pc.gif';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome

        };

        this.logout = this.logout.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info)=> {
            localStorage.nome = info.val().nome;
            this.setState({nome: localStorage.nome });
        })
    }

    logout = async () =>{
        await firebase.logout()
        .catch((error) =>{
            console.log(error);
        });
        localStorage.removeItem("nome");
        this.props.history.push('/');
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <div className="user-info2">
                <p>Logado com: {firebase.getCurrent()} </p>
                <img src={logo} alt="loading..."/><br/>
                <button onClick={()=> this.logout()}>Deslogar</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
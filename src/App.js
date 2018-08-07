import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//import Headers from '../node_modules/http-parser-js';
class ListItem extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      id:props.value,
      data:null,
    }
  }
  componentDidMount(){
    const url = "https://hacker-news.firebaseio.com/v0/"; 
    var header= {
      method:'GET',
      mode:'no-cors',
      headers:{'Access-Control-Allow-Origin':'*',
               'Access-Control-Allow-Methods':'OPTIONS, GET, POST',
               'Access-Control-Allow-Credentials':true,
               'Accept': 'application/json',
			         'Content-Type': 'application/json',
               'Allow':'OPTIONS, GET, POST',},
     // withCredentials: true,
     // credentials: 'same-origin',
      crossdomain: true,                    
    };  
    axios.get(url+'item/'+this.state.id.toString()+'.json', header)
      .then(res => {
          this.setState({
            isLoaded:true,
            id:this.state.id,
            data: res.data,
          });
          //this.state.data= res.data;
      })
  }
  showOverlay(){
    const { Overlay } = require('react-overlay');
    
    Overlay.value=this.state.data.url;
    Overlay.showOverlay=true;;
  }
  render(){
    //const rethtml
    //console.log(this.state);
    if(this.state.isLoaded){
      return (
        <div className="listItem" onClick={this.showOverlay()}>{this.state.data.title}</div>
      );
    }
    else {
      return <div className="twirly"></div>
    }
  }

}
class ListTitle extends Component{
  constructor(props){
    super(props);
  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "https://hacker-news.firebaseio.com/v0/"; 
    this.state={
      isLoaded:false,
      items:[],
    };
  }
  componentDidMount() {
   // var axios = require('axios');
    var header= {
      method:'GET',
      mode:'no-cors',
      headers:{'Access-Control-Allow-Origin':'*',
               'Access-Control-Allow-Methods':'OPTIONS, GET, POST',
               'Access-Control-Allow-Credentials':true,
               'Accept': 'application/json',
			         'Content-Type': 'application/json',
               'Allow':'OPTIONS, GET, POST',},
     // withCredentials: true,
     // credentials: 'same-origin',
      crossdomain: true,                    
    };   
  /*  header.set('Origin','http://localhost:3000/');
    header.set('Access-Control-Allow-Origin','http://localhost:3000');
    header.set('Allow','OPTIONS, POST');*/
    console.log(header);
    const url = "https://hacker-news.firebaseio.com/v0/"; 
   // var request = require('axios');
    axios.get(url+'jobstories.json', header)
      .then(res => {
        if (res.data){
             var ks=[];
             res.data.forEach(element => {
               ks.push(element.toString());
             });
             this.setState({
              isLoaded: true,
              items: res.data,
              keys:ks,
          });
        }
      });    
     /*(error) =>{
        alert(error.message);
      }*/
          // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      /*(error) => {
         alert(error.message);
      } */
  }

  render(){
    
    const ret=this.state.data.map( (item) => 
       <ListItem value={item} />
    );
    
    return(
      <ul>{ret}</ul>
    )
  }
}
class App extends Component {
 /* constructor(props) {
    this.state={
      listTitle:['Toto','Tata']
    };
  }*/
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ListTitle />
      </div>
    );
  }
}

export default App;

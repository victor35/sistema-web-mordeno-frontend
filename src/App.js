import React from 'react';

import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component  {

    obj = {
      busca:''
    }

 render(){
    return (
      <div className="App"> 
        <div className="p-text-center">iShop</div>
        <br/> <br/>
        <InputText value={this.obj.busca} onChange={(e) => this.setState({busca: e.target.value})} />
        <Button label="Pesquisar"/>

      </div>
    );
  }
}

export default App;

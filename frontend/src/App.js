import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} 
      from 'react-router-dom'
      import ListInventoryComponent from './components/ListInventoryComponent';
      import HeaderComponent from './components/HeaderComponent';
      import FooterComponent from './components/FooterComponent';
      import CreateInventoryComponent from './components/CreateInventoryComponent';
      import ViewInventoryComponent from './components/ViewInventoryComponent';
function App() {
  return (
    <div>
      <Router>
  <HeaderComponent />
  <div className="container">
      <Route path="/books" component={ListInventoryComponent}></Route>
      <Route path="/add-book/:id" component={CreateInventoryComponent}></Route>
      <Route path="/view-book/:id" component={ViewInventoryComponent}></Route>
      <Route path="/" exact component={ListInventoryComponent}></Route>
  </div>
  <FooterComponent />
</Router>
    </div>
    
  );
}

export default App;

import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Books from "./modules/books/Books";
import BookDetails from "./modules/books/BookDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>React task - md3</div>
        </header>
        <main id="content" className="App-content">
          <Switch>
            <Route exact path="/" component={Books} />
            <Route path="/books/:isbn" component={BookDetails} />
            <Redirect from="*" to="/" />
          </Switch>
        </main>
        <footer className="App-footer">
          <p>Search Books.</p>
        </footer>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className=" mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">Bloc Jams</span>
              <div className="mdl-layout-spacer"></div>
              <nav className="mdl-navigation">
                <Link  className="mdl-navigation__link" to='/'>Landing</Link>
                <Link  className="mdl-navigation__link" to='/library'>Library</Link>
              </nav>
            </div>
          </header>
        <main>
          <nav>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/Album/:slug" component={Album} />
          </nav>
        </main>
        </div>
      </div>
    );
  }
}

export default App;

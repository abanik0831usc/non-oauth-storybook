import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from "react";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Iframe } from "./stories/iframe";
import Search from "./stories/search";

function App({ theme, isAuthScreenFirstInStack }) {
  return (
    <Router>
      <div style={{ width: '860px' }}>
        <Switch>
          <Route path="/iframe">
            <Iframe isAuthScreenFirstInStack={isAuthScreenFirstInStack} theme={theme} />
          </Route>
          <Route path="/">
            {isAuthScreenFirstInStack ? <Iframe isAuthScreenFirstInStack={isAuthScreenFirstInStack} theme={theme} /> : <Search  isAuthScreenFirstInStack={isAuthScreenFirstInStack} theme={theme} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

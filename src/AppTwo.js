import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from "react";
import {
	MemoryRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { Iframe } from "./stories/iframeWithoutBtns";
import Search from "./stories/search";

function App({ theme, isAggregatorScreenFirstInWidgets }) {
	console.log('holies: ', theme, isAggregatorScreenFirstInWidgets)
	return (
		<Router>
			<div style={{ width: '860px' }}>
				<Switch>
					<Route path="/iframe">
						<Iframe isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} />
					</Route>
					<Route path="/">
						{isAggregatorScreenFirstInWidgets ? <Iframe isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} /> : <Search isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} />}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;

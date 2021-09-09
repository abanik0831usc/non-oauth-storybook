import './App.css';
import React from "react";
import {
	MemoryRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { IframeWithBtns } from "./stories/iframeWithBtns";
import Search from "./stories/search";
import PropTypes from "prop-types";

export function AggregatorButtons({ theme, isAggregatorScreenFirstInWidgets, iframeUrl, showIframeBorder = false }) {
	return (
		<Router>
			<div style={{ width: '860px' }}>
				<Switch>
					<Route path="/iframe">
						<IframeWithBtns isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} showIframeBorder={showIframeBorder} />
					</Route>
					<Route path="/">
						{isAggregatorScreenFirstInWidgets ? <IframeWithBtns showIframeBorder={showIframeBorder} iframeUrl={iframeUrl} isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} /> : <Search isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} />}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

AggregatorButtons.propTypes = {
	iframeUrl: PropTypes.string,
	/**
	 * theme passed by Intuit to apply selected styling
	 */
	theme: PropTypes.string.isRequired,

	/**
	 * height of the aggregator window
	 */
	height: PropTypes.string,

	/**
	 * width of aggregator window
	 */
	width: PropTypes.string,

	/**
	 * error payload when the connection returns an error
	 */
	error: PropTypes.shape({
		code: PropTypes.string,
		description: PropTypes.string,
		otherReasons: PropTypes.shape({
			reasons: PropTypes.string,
		}),
	}),

	/**
	 * Boolean informing the aggregator if the flow is launched directly (bypassing [search & select screen](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-screens))
	 */
	isAggregatorScreenFirstInWidgets: PropTypes.bool,

	/**
	 * the current [screen](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-screens) user is current in. Required for analytics
	 */
	currentScreen: PropTypes.string,

	/**
	 * Access Token of the provider once connection is successfully completed
	 */
	responseToken: PropTypes.string,

	/**
	 * Informs Aggregator or Intuit whether the user clicked [Secondary](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons) or [Primary Button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	navigate: PropTypes.oneOf(['forward', 'back']),
};

AggregatorButtons.defaultProps = {
	theme: 'sbg2',
	isAggregatorScreenFirstInWidgets: false,
	isConnectingScreen: false,
	currentScreen: 'authentication',
};

// export default App;

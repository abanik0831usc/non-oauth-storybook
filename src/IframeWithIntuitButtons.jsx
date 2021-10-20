import './App.css';
import React from "react";
import {
	MemoryRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { IframeWithIntuitButtons } from "./stories/iframeWithoutBtns";
import Search from "./stories/search";
import PropTypes from "prop-types";

export function IntuitButtons({ theme, iframeUrl, isAggregatorScreenFirstInWidgets, showIframeBorder = false }) {
	return (
		<Router>
			<div style={{ width: '860px' }}>
				<Switch>
					<Route path="/iframe">
						<IframeWithIntuitButtons isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} iframeUrl={iframeUrl} theme={theme} showIframeBorder={showIframeBorder} />
					</Route>
					<Route path="/">
						{isAggregatorScreenFirstInWidgets ? <IframeWithIntuitButtons iframeUrl={iframeUrl} showIframeBorder={showIframeBorder} isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} /> : <Search isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} />}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

IntuitButtons.propTypes = {
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
	 * Boolean to enable/disable [Primary Button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	enablePrimaryButton: PropTypes.bool,

	/**
	 * Bool to enable/disable the [Secondary button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	enableSecondaryButton: PropTypes.bool,

	/**
	 * [Connecting screen](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-screens)
	 * informs Intuit if the user is in the connecting screen
	 */
	isConnectingScreen: PropTypes.bool,

	/**
	 * the current [screen](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-screens) user is current in. Required for analytics
	 */
	currentScreen: PropTypes.string,

	/**
	 * Access Token of the provider once connection is successfully completed
	 */
	code: PropTypes.string,

	/**
	 * Informs Aggregator or Intuit whether the user clicked [Secondary](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons) or [Primary Button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	navigate: PropTypes.oneOf(['forward', 'back']),

	/**
	 * update text of [Primary Button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	primaryButtonLabel: PropTypes.string,

	/**
	 * connection payload response from aggregators. Can be in any format
	 */
	response: PropTypes.any
};

IntuitButtons.defaultProps = {
	theme: 'sbg2',
	isAggregatorScreenFirstInWidgets: false,
	isConnectingScreen: false,
	currentScreen: 'authentication',
};

// export default App;

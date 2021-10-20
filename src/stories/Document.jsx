import PropTypes from "prop-types";

export function IntuitButtonsDocuments({ theme, isAggregatorScreenFirstInWidgets }) {
	return (
		<div />
	);
}

IntuitButtonsDocuments.propTypes = {
	/**
	 * theme passed by Intuit to apply selected styling
	 */
	theme: PropTypes.string.isRequired,

	/**
	 * height of the aggregator window
	 */
	height: PropTypes.string.isRequired,

	/**
	 * width of aggregator window
	 */
	width: PropTypes.string.isRequired,

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
	enablePrimaryButton: PropTypes.bool.isRequired,

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
	currentScreen: PropTypes.string.isRequired,

	/**
	 * Access Token of the provider once connection is successfully completed
	 */
	code: PropTypes.string,
	/**
	 * Boolean to decide if the [secondary button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons) should be visible
	 */
	isSecondaryButtonVisible: PropTypes.bool,

	/**
	 * Informs Aggregator or Intuit whether the user clicked [Secondary](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons) or [Primary Button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	navigate: PropTypes.oneOf(['forward', 'back']).isRequired,

	/**
	 * update text of [Primary Button](/?path=/docs/mdx-intuit-aggregator-integration--page#widget-buttons)
	 */
	primaryButtonLabel: PropTypes.string,

	/**
	 * connection payload response from aggregators. Can be in any format
	 */
	response: PropTypes.any
};

IntuitButtonsDocuments.defaultProps = {
	theme: 'sbg2',
	isAggregatorScreenFirstInWidgets: false,
	isConnectingScreen: false,
	currentScreen: 'authentication',
	isSecondaryButtonVisible: true,
};

// export default App;

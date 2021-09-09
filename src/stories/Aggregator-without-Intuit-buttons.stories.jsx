import {AggregatorButtons} from '../IframeWithoutIntuitButtons';


export default {
	title: 'Example/Aggregator Without Intuit Buttons',
	component: AggregatorButtons,
	argTypes: {
		showIframeBorder: {
			default: false,
			type: { name: 'boolean', required: false },
			defaultValue: false,
			control: { type: 'boolean' },
		},
		iframeUrl: {
			defaultValue: 'https://www.google.com/',
			type: { name: 'string', required: false },
		},
		theme: {
			options: ['sbg2', 'mint', 'ck', 'intuit', 'ctg'],
			default: 'mint',
			name: 'theme',
			type: { name: 'string', required: true },
			defaultValue: 'sbg2',
			description: 'Intuit Theme requested by OfferingId',
			table: {
				type: {
					summary: 'What is Intuit OfferingId?',
					detail: 'Intuit offers a wide variety of offerings (products of Intuit QBO, Turbo Tax, Mint).\n\n' +
						'Intuit will pass theme as part of the query param to the aggregator.\n\n' +
						'The Theme can be used to apply styling by offering requirement.'
				},
				defaultValue: { summary: 'sbg2' },
			},
			control: { type: 'select' },
		},
		isAggregatorScreenFirstInWidgets: {
			control: { type: 'boolean' },
			default: false,
			name: 'isAggregatorScreenFirstInWidgets',
			type: { name: 'string', required: true },
			defaultValue: false,
			description: 'Informs aggregator if the flow started directly from their experience',
			table: {
				type: {
					summary: 'What is isAggregatorScreenFirstInWidgets?',
					detail: 'Intuit will pass this information to the aggregator inside the query param when partners own footer experience\n\n' +
						'Intuit offerings have the option of starting the flow from Search & Select(S&S) or Authentication Screen\n\n' +
						'When isAggregatorScreenFirstInWidgets is set to false it would imply the flow started from S&S\n' +
						'whereas true would imply the flow started from Authentication Screen\n\n' +
						'Aggregators will use this information to hide the (back) button in the first screen'
				},
				defaultValue: { summary: false },
			},
		},
		height: {
			name: 'height',
			type: { name: 'string', required: false },
			defaultValue: '352px',
			table: {
				type: {
					summary: 'what is height?',
					detail: 'Height property is the height of the aggregator window\n\n' +
						'Intuit requires this information from aggregator to decide on the height of the iframe they are loading'
				},
				defaultValue: { summary: '352px' },
			},
			control: {
				type: null
			}
		},
		width: {
			name: 'width',
			type: { name: 'string', required: false },
			defaultValue: '860px',
			table: {
				type: {
					summary: 'what is height?',
					detail: 'Height property is the height of the aggregator window\n\n' +
						'Intuit requires this information from aggregator to decide on the height of the iframe they are loading'
				},
				defaultValue: { summary: '860px' },
			},
			control: {
				type: null
			}
		},
		error: {
			name: 'error',
			type: { name: 'object', required: false },
			defaultValue: { code: '103', reason: 'invalid credentials passed', otherReasons: { reasons: 'mention other details' }},
			table: {
				type: {
					summary: 'what is error?',
					detail: 'A provider returning an error when an user attempts to make a connection\n\n' +
						'Intuit will require this information as part of their analytics logs, and to triage the causes of an error'
				},
				defaultValue: { summary: {code: '103', reason: 'invalid credentials passed', otherReasons: { reasons: 'mention other details' }} },
			},
			control: {
				type: null
			}
		},
		currentScreen: {
			name: 'currentScreen',
			type: { name: 'string', required: false },
			defaultValue: 'authentication',
			table: {
				type: {
					summary: 'what is currentScreen?',
					detail: 'currentScreen property informs Intuit the screen user is currently on.\n\n' +
						'It is required for analytics purposes'
				},
				defaultValue: { summary: 'authentication' },
			},
			control: {
				type: null
			}
		},
		responseToken: {
			name: 'responseToken',
			type: { name: 'string', required: false },
			defaultValue: 'token_value',
			table: {
				type: {
					summary: 'what is responseToken?',
					detail: 'responseToken property is the value returned by providers when a connection is successfully completed'
				},
				defaultValue: { summary: 'token_value' },
			},
			control: {
				type: null
			}
		},
		navigate: {
			name: 'navigate',
			defaultValue: 'forward',
			table: {
				type: {
					summary: 'what is navigate?',
					detail: 'Aggregator passes navigate property to Intuit\n\n' +
						'This is required for analytics reasons on user action\n\n' +
						'Intuit will also use this information to decide whether to go back to S&S screen on back click\n\n' +
						'This action is possible when screen name is either authentication or error, and navigate action is back'
				},
				defaultValue: { summary: 'forward' },
			},
			control: {
				type: null
			}
		},
	},
};

export const Playground = (args) => <AggregatorButtons {...args} />;

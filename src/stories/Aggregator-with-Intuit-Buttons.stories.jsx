import {IntuitButtons} from '../IframeWithIntuitButtons';


export default {
	title: 'Example/Aggregator With Intuit Buttons',
	component: IntuitButtons,
	argTypes: {
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
					detail: 'Intuit offerings have the option of starting the flow from Search & Select(S&S) or Authentication Screen\n\n' +
						'When isAggregatorScreenFirstInWidgets is set to false would imply the flow started from S&S\n' +
						'whereas true would imply the flow started from Authentication Screen\n\n' +
						'Intuit uses this information to hide the secondary (back) button\n\n' +
						'Intuit will pass this information to the aggregator inside the query param when partners own footer experience'
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
		enablePrimaryButton: {
			name: 'enablePrimaryButton',
			type: { name: 'boolean', required: false },
			defaultValue: false,
			table: {
				type: {
					summary: 'what is enablePrimaryButton?',
					detail: 'enablePrimaryButton property informs Intuit whether the buttons will be enabled or disabled\n\n' +
						'Intuit enables the primary button when certain validations and checks are met in a screen\n\n' +
						'Example: \n\n' +
						'In authentication screen the username and password will have to be provided\n\n' +
						'In Recaptcha screen, the recaptcha will have to return true to "Im human"'
				},
				defaultValue: { summary: false },
			},
			control: {
				type: null
			}
		},
		enableSecondaryButton: {
			name: 'enableSecondaryButton',
			type: { name: 'boolean', required: false },
			defaultValue: true,
			table: {
				type: {
					summary: 'what is enableSecondaryButton?',
					detail: 'enablePrimaryButton property informs Intuit whether the secondary buttons will be enabled or disabled\n\n' +
						'Usually always set to true\n\n'
				},
				defaultValue: { summary: true },
			},
			control: {
				type: null
			}
		},

		// TODO: from here
		isConnectingScreen: {
			name: 'isConnectingScreen',
			type: { name: 'boolean', required: false },
			defaultValue: false,
			table: {
				type: {
					summary: 'what is isConnectingScreen?',
					detail: 'isConnectingScreen property informs Intuit whether the footer should be visible or not\n\n' +
						'It is only during the connecting experience Intuit doesn\'t show the footer experience to the user\n\n'
				},
				defaultValue: { summary: false },
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
					detail: 'Intuit passes navigate property to aggregator\n\n' +
						'This will help decide whether to continue or go back\n\n' +
						'forward - will imply user clicked continue\n\n' +
						'back - will imply user clicked back'
				},
				defaultValue: { summary: 'forward' },
			},
			control: {
				type: null
			}
		},
		primaryButtonLabel: {
			name: 'primaryButtonLabel',
			type: { name: 'string', required: false },
			defaultValue: 'continue',
			table: {
				type: {
					summary: 'what is primaryButtonLabel?',
					detail: 'primaryButtonLabel property allows offerings to override content of primary button'
				},
				defaultValue: { summary: 'continue' },
			},
			control: {
				type: null
			}
		},
	},
};

export const Playground = (args) => <IntuitButtons {...args} />;

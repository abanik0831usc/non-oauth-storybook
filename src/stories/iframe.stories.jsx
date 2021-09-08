import React from 'react';

import { Iframe } from './iframe';

export default {
	title: 'Example/Iframe',
	component: Iframe,
	argTypes: {
		theme: {
			options: ['sbg2', 'mint', 'ck', 'intuit', 'ctg'],
			control: { type: 'select' },
			default: 'mint',
		},
		isAggregatorScreenFirstInWidgets: {
			control: { type: 'boolean' },
			default: false,
		}
	}
};

const Template = (args) => <Iframe {...args} />;

export const IFrameWithBtns = Template.bind({});
// LoggedIn.args = {
// 	theme: {
// 		options: ['primary', 'secondary'],
// 		control: { type: 'select' }
// 	},
// };
//
// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};

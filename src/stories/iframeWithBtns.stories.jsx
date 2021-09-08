import React from 'react';

import {IframeWithBtns} from './iframeWithBtns';

export default {
	title: 'Example/IframeWithBtns',
	component: IframeWithBtns,
	argTypes: {
		theme: {
			options: ['sbg2', 'mint', 'ck', 'intuit', 'ctg'],
			control: { type: 'select' },
			default: 'mint',
		},
		isAuthScreenFirstInStack: {
			control: { type: 'boolean' },
			default: false,
		}
	}
};

export const Template = (args) => <IframeWithBtns {...args} />;

// export const IFrameWithBtns = Template.bind({});
// LoggedIn.args = {
// 	theme: {
// 		options: ['primary', 'secondary'],
// 		control: { type: 'select' }
// 	},
// };
//
// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};

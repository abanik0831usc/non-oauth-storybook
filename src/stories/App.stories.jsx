import React from 'react';
import App from '../App';
import AppTwo from '../AppTwo';


export default {
	title: 'Example/App',
	component: App,
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

const Template = (args) => <App {...args} />;

const TemplateWithoutBtn = (args) => <AppTwo {...args} />;

export const AppWithBtns = Template.bind({});

export const AppWithoutBtns = TemplateWithoutBtn.bind({})
// LoggedIn.args = {
// 	theme: {
// 		options: ['primary', 'secondary'],
// 		control: { type: 'select' }
// 	},
// };
//
// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};

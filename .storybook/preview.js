import { setConsoleOptions } from '@storybook/addon-console'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const panelExclude = setConsoleOptions({}).panelExclude

setConsoleOptions({
  // panelExclude: [...panelExclude, /[Warning]/],
});
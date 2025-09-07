import type { Preview } from '@storybook/react-webpack5';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                order: ['Theme Builder 🎨', 'UK-WHO', 'CDC'],
            },
        },
    },
};

export default preview;

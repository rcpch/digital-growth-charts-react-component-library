import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['../src/images'],
    addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-webpack5-compiler-babel'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {},
};
export default config;

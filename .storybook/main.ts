import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['../src/images'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-onboarding',
        '@storybook/addon-docs',
        // {
        //     name: '@storybook/addon-styling-webpack',
        //     options: {
        //       rules: [
        //         // Replaces existing CSS rules with given rule
        //         // s
        //       ]
        //     }
        //   }
        '@storybook/addon-webpack5-compiler-babel'
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {},
};
export default config;

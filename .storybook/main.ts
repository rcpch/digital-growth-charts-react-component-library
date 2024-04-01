import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['../src/images', '../src/fonts'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-webpack5-compiler-babel',
        {
            name: '@storybook/addon-styling-webpack',
            options: {
              rules: [
                // Replaces existing CSS rules with given rule
                {
                  test: /\.css$/,
                  use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: { implementation: require.resolve("sass") }
                      },
                  ],
                }
              ]
            }
          }
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    }
};
export default config;

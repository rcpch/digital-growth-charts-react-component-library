import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import versionInjector from 'rollup-plugin-version-injector';
import image from '@rollup/plugin-image';
import dts from 'rollup-plugin-dts';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';

const packageJson = require('./package.json');
const production = !process.env.ROLLUP_WATCH;

let external = ['styled-components'];
let globals = {};

if (production) {
    external = [...external, 'react', 'react-dom'];
    globals = {
        react: 'React',
        'react-dom': 'ReactDOM',
        ...globals,
    };
}

export default [
    {
        input: 'src/index.ts',
        external,
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            postcss({
                plugins: [autoprefixer()],
                extensions: ['.css'],
                minimize: true,
                extract: true, // Include styles in the JS bundle
            }),
            peerDepsExternal(),
            resolve(),
            commonjs({
                ignoreGlobal: true,
                include: /\/node_modules\//,
            }),
            typescript(),
            terser(),
            json(),
            versionInjector(),
            image(),
            url({
                include: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.svg'],
                limit: 10000, // Adjust the limit as needed
                emitFiles: true,
                fileName: '[dirname][name][extname]', // Preserve the original file name
            }),
            copy({
                // copy the fonts from node_modules/@fontsource/montserrat/files/* to dist/fonts/*
                targets: [
                    {
                        src: 'node_modules/@fontsource/montserrat/files/*',
                        dest: 'dist/fonts/montserrat',
                    },
                    {
                        src: 'node_modules/@fontsource/dancing-script/files/*',
                        dest: 'dist/fonts/dancing-script',
                    },
                ],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/types.d.ts', format: 'es' }],
        // external: [/\.css$/],
        external: [],
        plugins: [dts.default()],
    },
];

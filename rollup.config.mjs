import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import versionInjector from 'rollup-plugin-version-injector';

const packageJson = require('./package.json');
const production = !process.env.ROLLUP_WATCH;

let external = ['styled-components'];
let globals = {};

if (production) {
    external = [...external, 'react', 'react-dom'];
    globals = {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',
        'styled-components': 'styled',
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
                extensions: ['.css'],
                inject: true,
            }),
            peerDepsExternal(),
            resolve(),
            commonjs({
                ignoreGlobal: true,
                include: /\/node_modules\//,
            }),
            typescript(),
            terser({
                compress: {
                    pure_getters: true, // assume obj.prop has no side effects
                    dead_code: true,
                    toplevel: true,
                },
                mangle: true,
            }),
            json(),
            versionInjector(),
            image(),
        ],
    },
    {
        input: 'src/index.ts',
        external: [],
        output: [{ file: 'build/types.d.ts', format: 'es' }],
        plugins: [dts.default()],
    },
    {
        input: 'src/umd.ts',
        external: ['react', 'react-dom', 'react-dom/client'],
        output: [
            {
                file: 'build/umd/rcpch-digital-growth-charts.umd.min.js',
                format: 'umd',
                name: 'RCPCHGrowthCharts',
                exports: 'default',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-dom/client': 'ReactDOM',
                },
                sourcemap: true,
            },
        ],
        plugins: [
            // this replaces all instances of process (eg process.env.NODE_ENV) which prevents the build from failing
            // this is done by creating a stub file that exports an empty object
            // and replacing all instances of process with the stub file
            alias({
                entries: [
                    {
                        find: 'process',
                        replacement: path.resolve(__dirname, 'src/stubs/process.js'),
                    },
                ],
            }),
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify('production'),
                },
            }),
            postcss({
                extensions: ['.css'],
                inject: true,
            }),
            resolve(),
            commonjs({
                ignoreGlobal: true,
                include: /\/node_modules\//,
            }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
                presets: ['@babel/preset-react', '@babel/preset-typescript'],
                extensions: ['.ts', '.tsx'],
            }),
            typescript(),
            terser({
                // some of the references are pretty big and chunking them would be difficult. This suppresses the warnings
                compress: {
                    pure_getters: true,
                    dead_code: true,
                    toplevel: true,
                },
                mangle: true,
                output: {
                    comments: false,
                    max_line_len: 1000000,
                },
            }),
            json(),
            versionInjector(),
            image(),
        ],
    },
];

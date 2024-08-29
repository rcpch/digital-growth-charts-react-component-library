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
            postcss(),
            peerDepsExternal(),
            resolve(),
            commonjs({
                ignoreGlobal: true,
                include: /\/node_modules\//,
            }),
            typescript(),
            terser(),
            url({
                include: ['**/*.ttf'], // Handle TTF fonts
                limit: 10000, // Inline files smaller than 10k, otherwise export as file
                emitFiles: true, // Emit files for larger fonts
            }),
            json(),
            versionInjector(),
            image(),
            copy({
                targets: [{ src: './fonts/**/*', dest: 'build/fonts/' }],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'build/types.d.ts', format: 'es' }],
        external: [/\.css$/],
        plugins: [dts.default()],
    },
];

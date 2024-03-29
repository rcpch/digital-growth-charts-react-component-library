import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import versionInjector from 'rollup-plugin-version-injector';

const packageJson = require('./package.json');

export default {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'styled-components'],
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
        peerDepsExternal(),
        resolve(),
        commonjs({
            ignoreGlobal: true,
            include: /\/node_modules\//,
        }),
        typescript({ useTsconfigDeclarationDir: true }),
        postcss(),
        copy({
            targets: [
                {
                    src: 'src/variables.scss',
                    dest: 'build',
                    rename: 'variables.scss',
                },
                {
                    src: 'src/typography.scss',
                    dest: 'build',
                    rename: 'typography.scss',
                },
            ],
        }),
        image(),
        json(),
        versionInjector(),
    ],
};

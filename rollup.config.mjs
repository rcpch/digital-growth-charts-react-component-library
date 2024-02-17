import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import versionInjector from 'rollup-plugin-version-injector';
import image from '@rollup/plugin-image';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            // {
            //   file: packageJson.module,
            //   format: "esm",
            //   sourcemap: true,
            // },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs({
                ignoreGlobal: true,
                include: /\/node_modules\//,
            }),
            typescript(),
            terser(),
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
            json(),
            versionInjector(),
            image(),
        ],
        external: ['react', 'react-dom', 'styled-components'],
    },
    // {
    //   input: "src/index.ts",
    //   output: [
    //     { file: "dist/types.d.ts", format: "es" },
    //     { dir: "output", format: "cjs" },
    //   ],
    //   plugins: [dts.default()],
    // },
];

// typescript({ useTsconfigDeclarationDir: true }),

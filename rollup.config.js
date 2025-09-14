import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'lib/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({ extract: 'style.css', minimize: true, sourceMap: true }),
      terser(),
    ],
    external: ['react', 'react-dom', 'reactstrap'],
  },
  {
    input: 'lib/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

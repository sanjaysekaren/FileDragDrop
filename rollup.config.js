import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonJS'
import externalDeps from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import visualizer from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace'

const globals = {
  react: 'React',
} 

const Global = `var process = {
  env: {
    NODE_ENV: 'production'
  }
}`

const external = ['react']

export default [
  {
    input: 'src/component/index.js',
    output: {
      file: 'dist/react-drag-drop-hook.js',
      format: 'es',
      sourcemap: true,
      banner: Global,
      globals
    },
    external: ['react'],
    plugins: [resolve(), babel(), commonJS(), externalDeps()],
  },
  {
    input: 'src/component/index.js',
    output: {
      file: 'dist/react-drag-drop-hook.min.mjs',
      format: 'es',
      sourcemap: true,
      banner: Global,
      globals
    },
    external: ['react'],
    plugins: [resolve(), babel(), commonJS(), externalDeps(), terser()],
  },
  {
    input: 'src/component/index.js',
    output: {
      name: 'FileDragDrop',
      file: 'dist/react-drag-drop-hook.development.js',
      format: 'umd',
      sourcemap: true,
      banner: Global,
      globals,
    },
    external: ['react'],
    plugins: [resolve(), babel(), commonJS(), externalDeps()],
  },
  {
    input: 'src/component/index.js',
    output: {
      name: 'FileDragDrop',
      file: 'dist/react-drag-drop-hook.production.min.js',
      format: 'umd',
      sourcemap: true,
      banner: Global,
      globals,
    },
    external: ['react'],
    plugins: [
      replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
      resolve(),
      babel(),
      commonJS(),
      externalDeps(),
      terser(),
      size(),
      visualizer(),
    ],
  },
]

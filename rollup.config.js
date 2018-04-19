import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import json from 'rollup-plugin-json';

import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'GitHubLanguagesClient',
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'GitHubLanguagesClient',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    json({
      exclude: 'node_modules/**',
      preferConst: true,
    }),
    babel({ exclude: 'node_modules/**' }),
    minify(),
    localResolve(),
    resolve(),
    commonjs(),
    filesize(),
  ],
};

export default config;

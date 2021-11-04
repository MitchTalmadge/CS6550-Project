import * as webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.config';

const config: webpack.Configuration = merge(common.config, {
  mode: 'development',

  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 9000,
  }
})

export default config;
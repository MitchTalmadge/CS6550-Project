import * as webpack from 'webpack';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

const config: webpack.Configuration = {
  entry: path.join(srcDir, 'entry.tsx'),
  module: {
    rules: [
      /* Code */
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      /* Images */
      {
        test: /\.(png|jp(e*)g|gif)$/,
        type: 'asset/resource',
      },
      /* Stylesheets */
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      /* SVG as Component */
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  output: {
    path: distDir,
    filename: 'app.js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(srcDir, 'favicon.png'),
      filename: 'index.html',
      template: path.join(srcDir, 'index.html.ejs'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

export default {config, srcDir};
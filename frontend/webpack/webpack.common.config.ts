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
      /* Stylesheets */
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      /* Images */
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html.ejs'),
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

export default {config, srcDir};
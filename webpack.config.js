const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// Filters .env config vars to start with APP_
const APP_ = /^APP_/i;
const env = Object.keys(require('dotenv').config().parsed)
  .filter((key) => APP_.test(key))
  .reduce((env, key) => {
    env['process.env.' + key] = JSON.stringify(process.env[key]);
    return env;
  }, {});
// Add package json vars
env['process.env.APP_VERSION'] = JSON.stringify(
  process.env.npm_package_version
);
env['process.env.APP_NAME'] = JSON.stringify(process.env.npm_package_name);

const config = (devMode) => {
  return {
    entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index.tsx')],

    output: {
      publicPath: '/',
      path: path.join(__dirname, 'build'),
      filename: '[name].bundle.js',
    },

    optimization: {
      runtimeChunk: 'single', // The value 'single' instead creates a runtime file to be shared for all generated chunks
      splitChunks: {
        chunks: 'all', // This indicates which chunks will be selected for optimization
        cacheGroups: {
          react: {
            automaticNamePrefix: 'react',
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
          },
        },
      },
    },

    devtool: devMode ? 'source-map' : '',

    resolve: {
      extensions: ['.ts', '.tsx', '.js'], // What extensions we should understand by default
      alias: {
        'react-dom': '@hot-loader/react-dom', // Replaces convetional react-dom with @hot-loader/react-dom for HMR support
        '@components': path.join(__dirname, 'src', 'components'), // Alias for components dir
        '@assets': path.join(__dirname, 'src', 'assets'), // Alias for assets dir
      },
    },

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                // Presets are sets of plugins
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                'react-hot-loader/babel',
              ],
            },
          },
        },
        {
          test: /\.s?css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // For HMR
                hmr: devMode,
                reloadAll: true,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader', // Transforms image to Base64 and embeds to bundle
              options: {
                limit: 8192, // Limits image size

                fallback: 'file-loader', // Use file loader if image is big
                name: devMode ? '[path][name].[ext]' : '[contenthash].[ext]',
                outputPath: 'images', // Use file loader if image is big
              },
            },
          ],
        },
        {
          test: /\.(ttf|otf|woff|woff2)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(xml)$/,
          use: ['xml-loader'],
        },
        {
          test: /\.(csv)$/,
          use: ['csv-loader'],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        minify: !devMode,
        title: 'Chat App',
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'src/favicon.ico'),
            to: path.join(__dirname, 'build'),
          },
        ],
      }),
      new webpack.DefinePlugin(env),
    ],

    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      compress: true,
      publicPath: '/',
      contentBase: path.join(__dirname, 'src'),
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          secure: false,
          changeOrigin: true,
        },
      }, // Proxy for server
    },
  };
};

module.exports = (env, argv) => {
  return config(argv.mode === 'development');
};

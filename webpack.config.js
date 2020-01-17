const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV
const devMode = env === 'dev'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/js',
  output: {
    filename: devMode === 'development' ? 'assets/js/main.js' : 'assets/js/main.[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '~js': path.resolve(__dirname, 'src/js'),
      '~css': path.resolve(__dirname, 'src/css'),
      '~data': path.resolve(__dirname, 'src/data'),
      '~assets': path.resolve(__dirname, 'src/assets'),
      '~shaders': path.resolve(__dirname, 'src/shaders'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: './src/static/**/*',
        to: './',
        transformPath(targetPath) {
          return targetPath.replace('src/static/', '')
        },
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      filename: 'index.html',
      env,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
          root: path.resolve(__dirname, 'src'),
        },
      },
      {
        test: /\.(jpg|png|svg|gif|mp4)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[hash].[ext]',
        },
      },
      {
        test: /\.(dae|obj|gltf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/objects/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(frag|vert|glsl)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(swiper|dom7)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['styled-jsx/babel', ['@babel/plugin-proposal-class-properties', {loose: true}]],
          },
        },
      },
    ],
  },
}

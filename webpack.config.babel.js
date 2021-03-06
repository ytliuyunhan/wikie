import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/client/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const isProduction = process.env.npm_lifecycle_event === 'build';

const ProdPlugins = [
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings: true
    }
  })
];

const DevPlugins = [
  new webpack.HotModuleReplacementPlugin()
];

const plugins = isProduction ? ProdPlugins : DevPlugins;
const sourceMap = isProduction ? 'cheap-module-source-map' : 'cheap-module-inline-source-map';

const config = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ...plugins
  ],
  devtool: sourceMap
};

if (!isProduction) {
  config.devServer = {
    contentBase: path.join(__dirname, '/dist'),
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  };
}

export default config;

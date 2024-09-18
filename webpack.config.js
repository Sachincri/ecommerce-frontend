const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js', // Add content hash for cache-busting
      publicPath: '/', // Important for serving assets from the correct path
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'), // Serve static files from 'public' directory
      },
      historyApiFallback: true, // Important for client-side routing (React Router)
      open: true, // Automatically open the browser
      hot: true, // Enable Hot Module Replacement
      port: 3000, // Port for your development server
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Handle .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(jpg|jpeg|png|gif|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: 'src/assets',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    devtool: isProduction ? false : 'source-map', // Enable source maps in development only
    optimization: {
      minimize: isProduction, // Minify in production mode
      minimizer: [new TerserPlugin()], // Use Terser for JS minification
      splitChunks: {
        chunks: 'all', // Split vendor code into separate chunks
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: isProduction ? 'static' : 'disabled', // Analyze in production build only
        openAnalyzer: false, // Prevent auto-opening
        reportFilename: path.resolve(__dirname, 'bundle-report.html'), // Output report file
      }),
    ].filter(Boolean), // Filter out disabled plugins
  };
};

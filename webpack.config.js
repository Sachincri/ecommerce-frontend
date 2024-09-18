const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/' // Important for serving assets from the correct path
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public') // Serve static files from 'public' directory
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
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: 'src/assets'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
};

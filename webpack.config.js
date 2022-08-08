const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
   
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader'
        },
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                  MiniCssExtractPlugin.loader, // (mode === 'development') ?  'style-loader' : MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                      loader: "postcss-loader",
                      options: {
                          postcssOptions: {
                              plugins: [
                                  [
                                      "postcss-preset-env",
                                                
                                      {
                                          //options
                                      },
                                  ],
                              ],
                          },
                      },
                  },
                  "sass-loader",
              ]
          },
          {
              test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
              type: 'asset/resource',
             
                generator: {
                  filename: (name) => {
                      /**
                       * @description Remove first & last item from ${path} array.
                       * @example
                       *      Orginal Path: 'src/images/avatar/image.jpg'
                       *      Changed To: 'images/avatar'
                       */
                      const path = name.filename.split("/").slice(1, -1).join("/");
                      return `${path}/[name][ext][query]`;
                  },
              },
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource'
          },
      
         /* {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }


              }
          }*/
        ],
    },
    optimization: {
      splitChunks: {
          chunks: 'all',
       
      },
  },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    
    },
    output: {
        filename: '[name].js', // '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: "assets/[name][ext][query]", // "assets/[hash][ext][query]",
        clean: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
   
        }),
        new MiniCssExtractPlugin({
          filename: 'style.css' //'[name].[contenthash].css'
      }),
      new CopyPlugin({
        patterns: [
            {
              from: path.resolve(__dirname, 'src/assets/'),
              to:   path.resolve(__dirname, 'dist/assets/')
            }
          ]
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};

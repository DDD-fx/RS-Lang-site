
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
    //  publicPath: '/'
    },
    devServer: {
      open: true,
        hot: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true,
        },
        historyApiFallback: true,
    },
    
};

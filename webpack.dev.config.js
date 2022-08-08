
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
      open: true,
        hot: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true,
        },
    },
    
};

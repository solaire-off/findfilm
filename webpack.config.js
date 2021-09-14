module.exports = (env) => env.BUILD_MODE === 'development'
    ? require('./webpack.config.dev')
    : require('./webpack.config.prod');
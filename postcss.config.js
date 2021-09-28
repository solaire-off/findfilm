module.exports = {
    plugins: [
        require('postcss-preset-env')({
            browsers: ["> 1%",
                "last 2 versions",
                "not ie <= 8"]
        })
    ]
}

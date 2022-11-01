'resolve.fallback: { "buffer": require.resolve("buffer/") }'

module.exports = {
    resolve:{
        fallback:{
            "buffer": require.resolve("buffer/"),
            "https": require.resolve("https-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "url": require.resolve("url/"),
            "stream": require.resolve("stream-browserify"),
            "https": false
        }
    }
}
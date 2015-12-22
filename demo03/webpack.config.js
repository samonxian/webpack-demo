module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
	module: {
        loaders: [
            { 
				test: /\.css$/, 
				loader: "style!css",
				exclude: /node_modules/,//设置node_modules目录为根目录下的node_modules,根目录以package为参考

			}
        ]
    }
};

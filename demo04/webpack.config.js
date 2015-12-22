module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
	module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
			{ 
            	test: /\.js[x]?$/, 
            	loader: "babel",
				exclude: /node_modules/,//设置node_modules目录为根目录下的node_modules,根目录以package为参考
            	query: {
			        presets: ['es2015', 'react']
			    }
            }//识别babel
        ]
    }
};

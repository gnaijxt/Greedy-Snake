const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//webpack中所有的配置学习都写在module.exports
module.exports = {
    mode: 'development',
    //入口文件
    entry: path.join(__dirname, './src/index.ts'),
    //指定打包文件所在目录
    output: {
        //指定打包的目录
        path: path.resolve(__dirname, "dist"),
        //打包后文件名
        filename: 'bundle.js',
        //告诉webpack不要使用箭头
        environment: {
            arrowFunction: false
        }
    },
    //指定webpack打包时使用的模块
    module: {
        //指定加载的规则
        rules: [
            {
                //test指定的是规则生效的文件
                test: /\.ts$/,
                //要使用的loader,从后往前执行
                use: [
                    {   //指定加载器
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [   //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        "targets": {
                                            "chrome": "88",
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式：“usage”按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",

                    }
                ],
                //要排除的文件
                exclude: /node-modules/
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                //从下往上执行use
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    //设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }

};
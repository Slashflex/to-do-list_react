const {resolve} = require('path');

module.exports = {
  entry: [
    resolve('./src/Input.js'),
    resolve('./src/ListTodo.js'),
    resolve('./src/Todo.js')
  ],
  mode: 'development',
  output: {
    path: resolve('./public/js/'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
    ]
  }
}
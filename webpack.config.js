const path = require('path');

module.exports = {
  "entry": "./src/main.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true
  },
  "module": {
    "rules": [
      {
        test: /\.(png|jpe?g|gif|ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env",
            ]
          }
        }
      }
    ]
  }
};

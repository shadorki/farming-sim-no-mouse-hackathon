const path = require('path');

module.exports = {
  "entry": "./src/main.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  "module": {
    "rules": [
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

module.exports = {
  mode: "development",
  // make sure the source maps work
  devtool: "eval-source-map",
  // webpack will transpile TS and JS files
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".jsx"]
  },
  module: {
    rules: [
      {
        // every time webpack sees a TS file (except for node_modules)
        // webpack will use "ts-loader" to transpile it to JavaScript
        test: /\.(ts|tsx)$/,
        //exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};

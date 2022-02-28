const path = require("path");

module.exports = {
  mode: "development",
  // mode: "production",
  optimization: {
    minimize: true,
    concatenateModules: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  entry: "./src/Copper3D/main.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "copper3d.js",
    library: "Copper3D",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|bin|gif|glb|gltf|obj|mtl)$/,
        loader: "file-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
};

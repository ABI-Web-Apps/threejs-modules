const path = require("path");
const glob = require("glob");
// add webpack plugin, in order to help run serve
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const setMpa = () => {
  const entry = {}; //entry obj
  const htmlWebpackPlugins = []; //html-webpack-plugins store in here
  //get each single index file
  const entryFiles = glob.sync(
    path.join(__dirname, "./src/examples/*/index.js")
  );

  Object.keys(entryFiles).map((index) => {
    const entryFil = entryFiles[index];
    // get the folder name
    const match = entryFil.match(/src\/examples\/(.*)\/index\.js/);
    const pathname = match && match[1];
    //config the entry files
    entry[pathname] = entryFil;
    //config html-webpack-plugin
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/examples/${pathname}/index.html`),
        filename: `${pathname}.html`,
        chunks: [pathname],
        hash: true,
        inject: true,
        minify: {
          minifyJS: true,
          minifyCSS: true,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMpa();
module.exports = {
  devtool: "eval-source-map", // for debug
  mode: "development",
  entry: entry,
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].ABI.js",
  },
  plugins: [new CleanWebpackPlugin()].concat(htmlWebpackPlugins),
  optimization: {
    minimize: true,
    concatenateModules: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "cache-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/i,
        use: [
          "cache-loader",
          {
            loader: "babel-loader?cacheDirectory=true",
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|bin|gif|glb|gltf|obj|mtl|dcm)$/,
        loader: "file-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
};

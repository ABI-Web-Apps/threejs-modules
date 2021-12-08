const path = require("path");
const glob = require("glob");
// add webpack plugin, in order to help run serve
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const setMpa = () => {
  const entry = {}; //entry obj
  const htmlWebpackPlugins = []; //html-webpack-plugins store in here
  //get each single index file
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  Object.keys(entryFiles).map((index) => {
    const entryFil = entryFiles[index];
    // get the folder name
    const match = entryFil.match(/src\/(.*)\/index\.js/);
    const pathname = match && match[1];
    //config the entry files
    entry[pathname] = entryFil;
    //config html-webpack-plugin
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pathname}/index.html`),
        filename: `${pathname}.html`,
        chunks: [pathname],
        hash: true,
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyJS: true,
          minifyCSS: true,
          removeComments: false,
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
// console.log(entry);
module.exports = {
  mode: "development",
  // for build
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].ABI.js",
  },
  plugins: [new CleanWebpackPlugin()].concat(htmlWebpackPlugins),

  // for dev
  // entry: {
  //   example04: path.join(__dirname, "./src/example04/index.js"),
  // },
  // output: {
  //   path: path.join(__dirname, "./dist"),
  //   filename: "[name].ABI.js",
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     chunks: ["example04"],
  //     template: "./src/example04/index.html",
  //     // when the single file here must be index.html, if the file name is not index.html, the root will be public folder
  //     filename: "index.html",
  //     hash: true,
  //     minify: {
  //       removeComments: true,
  //       collapseWhitespace: true,
  //     },
  //   }),
  // ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      { test: /\.less$/i, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
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

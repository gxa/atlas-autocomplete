const path = require(`path`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);

const vendorsBundleName = `vendorCommons`

const config = {
  entry: {
    atlasAutocomplete: [`@babel/polyfill`, `./html/render.js`]
  },

  plugins: [
    new CleanWebpackPlugin()
  ],

  output: {
    library: `[name]`,
    path: path.resolve(__dirname, `dist`),
    filename: `[name].bundle.js`,
    publicPath: `/dist/`
  },


  resolve: {
    alias: {
      "react": path.resolve(`./node_modules/react`),
      "react-dom": path.resolve(`./node_modules/react-dom`),
      "styled-components": path.resolve(`./node_modules/styled-components`)
    },
  },

  optimization: {
    runtimeChunk: {
       name: vendorsBundleName
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: vendorsBundleName,
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\//,
        use: `babel-loader`
      }
    ]
  },

  devServer: {
    port: 9000
  }
}

module.exports = config

import path from "path"
import webpack from "webpack"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  entry: "./src/index.js",
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "app_bundle"),
    filename: "app.bundle.js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"), // Explicitly point to node_modules
      "node_modules"
    ],
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}

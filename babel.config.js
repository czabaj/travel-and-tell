module.exports = {
  presets: ["@babel/preset-typescript"],
  plugins: [
    ["snowpack/assets/babel-plugin.js"],
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "Preact.h",
        pragmaFrag: "Preact.Fragment"
      }
    ]
  ]
};

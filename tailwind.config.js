module.exports = {
  purge: ["./src/index.js", "src/components/**/*.js"],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: [`responsive`, `hover`, `focus`, `active`],
    cursor: [`hover`],
  },
  plugins: [],
}

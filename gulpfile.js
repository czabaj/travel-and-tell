const gulp = require("gulp")

function css() {
  const postcss = require("gulp-postcss")

  return gulp
    .src("src/*.css")
    .pipe(postcss([require("tailwindcss"), require("autoprefixer")]))
    .pipe(gulp.concat("lib/index.css"))
}

exports.default = function() {
  gulp.watch("src/*.css", css)
}

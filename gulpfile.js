const gulp = require("gulp");

function css() {
  const postcss = require("gulp-postcss");

  return gulp
    .src("src/*.css")
    .pipe(postcss([require("tailwindcss"), require("autoprefixer")]))
    .pipe(gulp.dest("lib/"));
}

function js() {
  return src("src/*.js", { sourcemaps: true }).pipe(
    dest("build/js", { sourcemaps: true })
  );
}

exports.default = function() {
  gulp.watch("src/*.css", css);
};

const gulp = require("gulp")

function css() {
  const postcss = require("gulp-postcss")
  const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: ["wwwroot/index.html", "wwwroot/src/**/*.js"],

    // Include any special characters you're using in this regular expression
    // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  })

  return gulp
    .src("index.css")
    .pipe(
      postcss(
        [
          require("tailwindcss"),
          require("autoprefixer"),
          process.env.NODE_ENV === "production" && purgecss,
        ].filter(Boolean),
      ),
    )
    .pipe(gulp.dest("wwwroot"))
}

exports.css = css
exports.default = function() {
  gulp.watch("index.css", css)
}

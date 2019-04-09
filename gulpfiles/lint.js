/**
 * @file
 * Lints CSS and JS.
 */

import gulp from 'gulp';
import sassLint from 'gulp-sass-lint';
import eslint from 'gulp-eslint';

import config from './config';

// The actual files to lint (or ignore).
const lintFiles = {
  js: [
    `${config.js.src}/**/*.es6.js`,
    `${config.js.modules}/**/js/*.es6.js`,
    // Ignore already minified files.
    `!${config.js.src}/**/*.min.js`,
    `!${config.js.modules}/**/js/*.min.js`,
    // Ignore webpack bundled files
    `!${config.js.src}/**/*.bundle.js`,
    `!${config.js.modules}/**/js/*.bundle.js`,
  ],

  sass: [
    `${config.sass.src}/**/*.scss`,
  ],
};

/**
 * Lint JS.
 * @return {object} js
 */
const js = () => (
  gulp.src(lintFiles.js)
    .pipe(eslint())
    .pipe(eslint.format())
);

js.description = 'Lints all JS src files.';
gulp.task('lint:js', js);

/**
 * Lint JS (with fail).
 * @return {object} jsWith Fail
 */
const jsWithFail = () => (
  gulp.src(lintFiles.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

jsWithFail.description = 'Lints all JS src files, and fail on an error.';
gulp.task('lint:js-with-fail', jsWithFail);

/**
 * Fix as many JS Lint issues as possible.
 * @return {object} fixJs
 */
const fixJs = () => (
  gulp.src(lintFiles.js, { base: './' })
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulp.dest('./'))
);

fixJs.description = 'Lints all JS src files.';
gulp.task('lint:js-fix', fixJs);

/**
 * Lint Sass.
 * @return {object} sass
 */
const sass = () => (
  gulp.src(lintFiles.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
);

sass.description = 'Lints all Sass src files.';
gulp.task('lint:sass', sass);

/**
 * Lint Sass (with fail).
 * @return {object} sassWithFail
 */
const sassWithFail = () => (
  gulp.src(lintFiles.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
);

sassWithFail.description = 'Lints all Sass src files, and fail on an error.';
gulp.task('lint:sass-with-fail', sassWithFail);

/**
 * Run both linters in series.
 */
const lint = gulp.series('lint:sass', 'lint:js');
lint.description = 'Lint Sass and JS.';
gulp.task('lint', lint);

/**
 * Run both linters in series (with fail).
 */
const lintWithFail = gulp.series('lint:sass-with-fail', 'lint:js-with-fail');
lintWithFail.description = 'Lint Sass and JS, and fail on an error.';
gulp.task('lint:with-fail', lintWithFail);

// Export all functions.
export { js, jsWithFail, sass, sassWithFail, lint, lintWithFail };
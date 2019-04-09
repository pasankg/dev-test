/**
 * @file
 * Defines tasks from imported functions.
 */

'use strict';

import gulp from 'gulp';

import config from './gulpfiles/config';
import * as styles from './gulpfiles/styles';
import * as clean from './gulpfiles/clean';
import * as lint from './gulpfiles/lint';
import * as styleguide from './gulpfiles/styleguide';
import * as watch from './gulpfiles/watch';
import * as scripts from './gulpfiles/scripts';
import * as modernizr from './gulpfiles/modernizr';
import * as svg from './gulpfiles/svg';

/**
 * Build for production and fail on a linting error.
 */
const build = gulp.series('styles:production', 'scripts:production', 'styleguide');
build.description = 'Build all styles and styleguide (for production).';
gulp.task('build', build);

// Set the default task to build.
gulp.task('default', build);

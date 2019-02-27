import pump from 'pump';
import { task, series, parallel, src, dest } from 'gulp';
import eslint from 'gulp-eslint';
import prettier from 'gulp-prettier';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';
import { resolve } from 'path';
import del from 'del';

const srcRoot = resolve(__dirname, 'src');
const srcTSGlob = resolve(srcRoot, '**/*.ts');
const distRoot = resolve(__dirname, 'dist');

task('dist:clean', () => {
    return del(distRoot);
});

const tsProject = typescript.createProject('tsconfig.json');

const uglifyOpts = {
    compress: {
        drop_console: true, // Removes console.*. Comment out to disable removal. Must be enabled in production!
        warnings: true
    },
    mangle: {
        toplevel: true
    }
}

task('ts:build', cb => {
    pump([
        src(srcTSGlob),
        tsProject(),
        uglify(uglifyOpts),
        dest(distRoot)
    ], cb);
});

task('ts:check', cb => {
    pump([
        src(srcTSGlob),
        eslint(),
        prettier(),
        dest(srcRoot)
    ], cb);
});

task('build', series(
    'dist:clean',
    parallel(
        'ts:build',
        'ts:check'
    )
));
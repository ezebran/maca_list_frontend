/*
gulp.task -> Crear una tarea -> gulp.task('nombre de la tarea', ()=>{lo que va a hacer la tarea})
gulp.src -> Origen del documento -> gulp.src('ruta del origen del archivo')
gulp.pipe -> Unión de las diferentes secciones de la tarea -> .pipe(sección)
gulp.dest -> Destino del documento -> gulp.dest('ruta de destino del archivo')
gulp.watch -> Vigilar los cambios en la ruta que le digamos -> gulp.watch ('ruta a vigilar', ['tarea, tarea, tarea, ...'])podemos pasar una única tarea o varias
*/


const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


gulp.task('sass',()=>{
	gulp.src('./src/scss/*.scss')
		.pipe(sass({
			outputStyle: 'compressed' /* nested | compact | expanded | compressed */
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers:['last 3 versions']
		}))
		.pipe(gulp.dest('./public/assets/css'))
		.pipe(browserSync.stream())
})

/* En el caso de que se quiera vigilar mas de un scss dentro de un carpeta, indicar con .../*.scss */
gulp.task('serve',['sass'], ()=>{
	browserSync.init({
		server: './public'
	})
	gulp.watch('./src/scss/*.scss',['sass'])
	gulp.watch("./public/*.html").on('change', browserSync.reload)
})

gulp.task('default', ['serve']);
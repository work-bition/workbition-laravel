const gulp = require('gulp')

//导入semantic UI框架的gulp任务
const watch = require('./semantic-ui/tasks/watch'),
      build = require('./semantic-ui/tasks/build'),
      clean = require('./semantic-ui/tasks/clean')


//监视semantic-UI框架的源文件
gulp.task('watch-ui', watch)
//清理semantic UI框架生成的目录
gulp.task('clean-ui', clean)
//构建semantic UI框架（确保清理任务完成后）
gulp.task('build-ui', ['clean-ui'], build)

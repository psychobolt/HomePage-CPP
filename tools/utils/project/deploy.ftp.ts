import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as ftp from 'vinyl-ftp';
import * as sftp from 'gulp-sftp';
import {argv} from 'yargs';

const TASK_NAME = 'deploy.ftp';

export function deploy() {
  if (!argv.deploy || !argv.deploy.ftp) {
    throw new gutil.PluginError({
      plugin: TASK_NAME,
      message: '--deploy.ftp arugment required'
    });
  }

  if (!argv.deploy.ftp.host) {
    throw new gutil.PluginError({
      plugin: TASK_NAME,
      message: '--deploy.ftp.host arugment required'
    });
  }

  if (!argv.deploy.ftp.dest) {
    throw new gutil.PluginError({
      plugin: TASK_NAME,
      message: '--deploy.ftp.dest arugment required'
    });
  }

  if (argv.deploy.ftp.ssh) {
    let conn = sftp({
      host: argv.deploy.ftp.host,
      port: argv.deploy.ftp.port,
      username: argv.deploy.ftp.user,
      password: argv.deploy.ftp.password,
      agent: argv.deploy.ftp.agent,
      remotePath: argv.deploy.ftp.dest,
      debug: function (message) {
        console.log(message);
      }
    });
    return gulp.src(['dist/prod/index.html', 'dist/prod/**/*'], {base: 'dist/prod', buffer: false})
               .pipe(conn);
  } else {
    let conn = ftp.create({
      host: argv.deploy.ftp.host,
      port: argv.deploy.ftp.port,
      user: argv.deploy.ftp.user,
      password: argv.deploy.ftp.password,
      log: gutil.log,
      secure: argv.deploy.ftp.secure,
      debug: function (message) {
        console.log(message);
      }
    });
    return gulp.src('dist/prod/**/*', {base: 'dist/prod', buffer: false})
               .pipe(conn.newer(argv.deploy.ftp.dest))
               .pipe(conn.dest(argv.deploy.ftp.dest));
  }
};

gulp.task(TASK_NAME, deploy);

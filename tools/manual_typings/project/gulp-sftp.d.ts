declare module 'gulp-sftp' {
  interface GulpSFTPOptions {
    host: string,
    port?: number,
    username?: string,
    password?: string,
    agent?: string,
    remotePath?: string,
    debug?(message: string): void
  }
  function sftp(options: GulpSFTPOptions): any
  module sftp {}
  export = sftp
}
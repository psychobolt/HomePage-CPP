declare module 'vinyl-ftp' {
  interface VinylFTPOptions {
    host: string,
    port?: number,
    user?: string,
    password?: string,
    parallel?: number,
    log?(message?: any, ...optionalParams: any[]): void,
    secure?: boolean,
    debug?(message: string): any
  }
  interface FTPConnection {
    newer(folder: string, options?: any): any
    dest(folder: string, options?: any): any;
  }
  interface VinylFTP {
    create(options: VinylFTPOptions) : FTPConnection
  }
  const vinylFTP : VinylFTP;
  export = vinylFTP;
}

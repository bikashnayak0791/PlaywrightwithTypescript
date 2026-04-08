export class InitializedException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InitializedException';
    }
  }
class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(msg: string, stats = 400) {
    this.message = msg;
    this.statusCode = stats;
  }
}

export default AppError;

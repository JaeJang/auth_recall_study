abstract class HttpError extends Error {
  public status!: number;
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message);

    this.status = 500;
  }
}

export class Unauthorized extends HttpError {
  constructor(message = "Unauthorized") {
    super(message);

    this.status = 401;
  }
}

export class NotFound extends HttpError {
  constructor(message = "Resource Not Found") {
    super(message);

    this.status = 404;
  }
}

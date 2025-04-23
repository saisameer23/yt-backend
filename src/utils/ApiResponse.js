class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data) {
    return new ApiResponse(200, 'Success', data);
  }

  static error(message, statusCode = 500) {
    return new ApiResponse(statusCode, message, null);
  }
}
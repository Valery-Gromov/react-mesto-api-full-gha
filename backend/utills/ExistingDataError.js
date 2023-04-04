class ExistingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExistingDataError';
    this.statusCode = 409;
  }
}

module.exports = ExistingDataError;

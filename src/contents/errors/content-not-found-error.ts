export class ContentNotFoundError extends Error {
  constructor(message = 'Content not found') {
    super(message)
  }
}

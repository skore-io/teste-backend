export class DuplicateIDError extends Error {
  constructor(message = 'ID already present') {
    super(message)
  }
}

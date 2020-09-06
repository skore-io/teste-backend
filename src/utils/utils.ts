import { randomBytes } from 'crypto'

export default {
  generateUniqueId(idSize: number) {
    return randomBytes(idSize).toString('HEX')
  },
}

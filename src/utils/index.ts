import { Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  /**
   * Retorna Unix Timestamp em UTC.
   * 
   * @returns number
   */
  getUTCTimestamp(): number {
    return Math.floor((new Date()).getTime() / 1000);
  }
}
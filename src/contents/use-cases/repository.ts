import { Content } from '../models/content';

export interface Repository {
  get(id: number);
  put(content: Content): Content;
}

import { Content } from "../models/content";

export class InMemoryRepository{
  private db = {}

  public get(id: number){
    return this.db[id]
  }

  public put(content: Content){
    return this.db[content.geId()] = content
  }
}
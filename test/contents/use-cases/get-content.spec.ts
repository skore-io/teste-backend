import { GetContent } from '../../../src/contents/use-cases/get-content';
import { InMemoryRepository } from '../../../src/contents/repository/in-memory-repository';
import { Content } from '../../../src/contents/models/content';

describe('create', () => {
  const content = new Content(
    1,
    'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    3006,
    'youtube',
    'video',
    'STKCRSUsyP0',
    1580428851394,
  );
  describe("content doen't exists", () => {
    const repotitory = new InMemoryRepository();
    jest.spyOn(repotitory, 'get').mockImplementation(() => undefined);
    const result = new GetContent(repotitory).run(2);
    it('returns a falsey result', () => {
      expect(result.isSuccess).toBeFalsy();
      expect(result.error).toEqual('2 not found');
    });
  });
  describe('content does exists', () => {
    const repotitory = new InMemoryRepository();
    jest.spyOn(repotitory, 'get').mockImplementation(() => content);
    const result = new GetContent(repotitory).run(1);
    it('returns a truthy result', () => {
      expect(result.content).toEqual(content);
      expect(result.isSuccess).toBe(true);
      expect(result.error).toEqual(undefined);
    });
    it('sets as watched', () => {
      expect(result.content.isWatched()).toBe(true);
    });
    it('sets the expired', () => {
      expect(result.content.isExpired()).toBe(true);
    });
  });
});

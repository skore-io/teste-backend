import { CreateContent } from '../../../src/contents/use-cases/create-content';
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
  describe('content exists', () => {
    const repotitory = new InMemoryRepository();
    jest.spyOn(repotitory, 'get').mockImplementation(() => content);
    const result = new CreateContent(repotitory).run(content);
    it('returns a falsey result', () => {
      expect(result.isSuccess).toBeFalsy();
      expect(result.errors).toEqual(['1 already added']);
    });
  });
  describe("content doesn't exists", () => {
    const repotitory = new InMemoryRepository();
    jest.spyOn(repotitory, 'get').mockImplementation(() => undefined);
    const result = new CreateContent(repotitory).run(content);
    it('returns a truthy result', () => {
      expect(result.content).toEqual(content);
      expect(result.isSuccess).toBeTruthy();
      expect(result.errors).toEqual([]);
    });
  });
});

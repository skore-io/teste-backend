import { UpdateContent } from '../../../src/contents/use-cases/update-content';
import { InMemoryRepository } from '../../../src/contents/repository/in-memory-repository';
import { Content } from '../../../src/contents/models/content';

describe('update', () => {
  const oldContent = new Content(
    1,
    'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    3006,
    'youtube',
    'video',
    'STKCRSUsyP0',
    1580428851394,
  );
  const newContent = new Content(
    1,
    'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    3006,
    'youtube',
    'video',
    'new value here',
    1580428851394,
  );

  oldContent.setWatched()
  
  describe('content exists', () => {
    const repotitory = new InMemoryRepository();
    jest.spyOn(repotitory, 'get').mockImplementation(() => oldContent);
    const result = new UpdateContent(repotitory).run(newContent);
    it('returns a falsey result', () => {
      expect(result.isSuccess).toBeFalsy();
      expect(result.error).toBeUndefined();
    });
  });
  describe("content doesn't exists", () => {
    const repotitory = new InMemoryRepository();
    jest.spyOn(repotitory, 'get').mockImplementation(() => undefined);
    const result = new UpdateContent(repotitory).run(newContent);
    it('returns a truthy result', () => {
      expect(result.content).toEqual(newContent);
      expect(result.isSuccess).toBe(true);
      expect(result.error).toEqual('1 not found');
    });

    it('sets watched to false', () => {
      expect(result.content.isWatched()).toBe(false);
    });
  });
});

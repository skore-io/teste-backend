import { RemoveContent } from '../../../src/contents/use-cases/remove-content';
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
    it('returns a falsey result', () => {
      expect(
        new RemoveContent(new InMemoryRepository()).run(1),
      ).toBeUndefined();
    });
  });
});

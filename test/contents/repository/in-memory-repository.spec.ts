import { InMemoryRepository } from '../../../src/contents/repository/in-memory-repository';
import { Content } from '../../../src/contents/models/content';

let repository;
const content = new Content(
  1,
  'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
  3006,
  'youtube',
  'video',
  'STKCRSUsyP0',
  1580428851394,
);

beforeEach(() => {
  repository = new InMemoryRepository();
});

describe('get', () => {
  it('returns null when not found', () => {
    expect(repository.get(1)).toBeUndefined();
  });

  it('returns the content when found', () => {
    repository.put(content);
    expect(repository.get(1)).toEqual(content);
  });
});

describe('put', () => {
  it('adds a content', () => {
    expect(repository.get(1)).toBeUndefined();
    repository.put(content);
    expect(repository.get(1)).toEqual(content);
  });

  it("returns it's value", () => {
    const addedContent = repository.put(content);
    expect(addedContent).toEqual(content);
  });
});

describe('remove', () => {
  it('removes a content', () => {
    repository.put(content);
    repository.remove(1);
    expect(repository.get(1)).toBeUndefined();
  });

  it('doesnt throw error when not found', () => {
    expect(repository.remove(1)).toBeUndefined();
  });
});

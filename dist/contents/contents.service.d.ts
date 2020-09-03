import { Content } from 'src/content';
export declare class ContentsService {
    contents: Content[];
    getAll(): Content[];
    getById(id: number): Content;
    create(content: Content): Content;
    update(content: Content): Content;
    delete(id: number): void;
}

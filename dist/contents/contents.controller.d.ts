import { ContentsService } from './contents.service';
import { Content } from 'src/content';
export declare class ContentsController {
    private contentService;
    constructor(contentService: ContentsService);
    getAll(): Promise<Content[]>;
    getById(id: number): Promise<Content>;
    create(content: Content): Promise<Content>;
    update(content: Content): Promise<Content>;
    delete(id: number): Promise<void>;
}

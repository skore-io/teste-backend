import { Injectable, HttpException } from '@nestjs/common';
import { Content } from 'src/content';

@Injectable()
export class ContentsService {

    contents: Content[] = [
        {
            "id": 1,
            "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
            "duration": 3006,
            "provider": "youtube",
            "media_type": "video",
            "provider_id": "STKCRSUsyP0",
            "expires_at": 1580428851394,
            "watched": false,
            "expired": false
        },
    ];

    getAll() {
        return this.contents;
    }

    getById(id: number) {
        const content = this.contents.find((value) => value.id == id);

        if (!content) {
            throw new HttpException("Content not found", 404);
        }

        if (content.expires_at < new Date().getTime()) {
            content.expired = true;
        } else {
            content.expired = false;
        }

        this.contents = this.contents.map(c => {
            if (c.id == content.id) {
                return {...content, "watched": true};
            }
            return c;
        });

        return content;
    }

    create(content: Content) {
        let lastId = 0;
       
        if (this.contents.length > 0) {
            lastId = this.contents[this.contents.length - 1].id;
        }

        content.id = lastId + 1;
        content.expired = false;
        content.watched = false;
        this.contents = [...this.contents, {...content}];

        return content;

    }

    update(content: Content) {
        this.contents = this.contents.map(c => {
            if (c.id == content.id) {
                return {...content, "watched": false, "expired": c.expired};
            }
            return c;
        });
        return content;
    }

    delete (id: number) {
        this.contents = this.contents.filter(c => c.id != id);
    }
}

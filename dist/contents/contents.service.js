"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentsService = void 0;
const common_1 = require("@nestjs/common");
const content_1 = require("../content");
let ContentsService = class ContentsService {
    constructor() {
        this.contents = [
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
    }
    getAll() {
        return this.contents;
    }
    getById(id) {
        const content = this.contents.find((value) => value.id == id);
        if (!content) {
            throw new common_1.HttpException("Content not found", 404);
        }
        if (content.expires_at < new Date().getTime()) {
            content.expired = true;
        }
        else {
            content.expired = false;
        }
        this.contents = this.contents.map(c => {
            if (c.id == content.id) {
                return Object.assign(Object.assign({}, content), { "watched": true });
            }
            return c;
        });
        return content;
    }
    create(content) {
        let lastId = 0;
        if (this.contents.length > 0) {
            lastId = this.contents[this.contents.length - 1].id;
        }
        content.id = lastId + 1;
        content.expired = false;
        content.watched = false;
        this.contents = [...this.contents, Object.assign({}, content)];
        return content;
    }
    update(content) {
        this.contents = this.contents.map(c => {
            if (c.id == content.id) {
                return Object.assign(Object.assign({}, content), { "watched": false, "expired": c.expired });
            }
            return c;
        });
        return content;
    }
    delete(id) {
        this.contents = this.contents.filter(c => c.id != id);
    }
};
ContentsService = __decorate([
    common_1.Injectable()
], ContentsService);
exports.ContentsService = ContentsService;
//# sourceMappingURL=contents.service.js.map
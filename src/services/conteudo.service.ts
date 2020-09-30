import { ConflictException, HttpException, Injectable } from '@nestjs/common';
 
import { Conteudo } from "src/models/conteudo.model";
 
@Injectable()
export class ConteudoService {

    private conteudos: Conteudo[] = [];
 
    getAll(): Conteudo[] {
        return this.conteudos;
    }
    
    get(id): Conteudo {
        const conteudo = this.conteudos.find(obj => obj.id == id); 
        const dataAtual = new Date;
        if (conteudo.expires_at < dataAtual) {
            conteudo.expired = true;
        }
        if (!conteudo.watched) {
            const model = conteudo;
            this.conteudos = this.conteudos.map(c => {
                if (c.id == model.id) {
                    model.watched = true;
                    return model;
                }
                return c;
            });
        }
        return conteudo;
    }
    
    create(model: Conteudo): Conteudo {
        const conteudo = this.conteudos.find(obj => obj.id == model.id); 
        if (conteudo == null) {
            this.conteudos.push(new Conteudo(model.id, model.name, model.duration, model.provider, model.media_type, model.provider_id, model.expires_at, false, false));
            model.expired = false;
            model.watched = false;
            return model;
        } else {
            throw new HttpException('Já existe um conteúdo com o mesmo id.', 500);
        }
    }
    
    update(id: number, model: Conteudo): Conteudo {
        this.conteudos = this.conteudos.map(c => {
            if (c.id == model.id) {
                model.watched = false;
                model.expired = c.expired;
                return model;
            }
            return c;
        });
        return model;
    }
    
    remove(_id: number) {
        this.conteudos.splice(this.conteudos.findIndex(function(i){
            return i.id === _id;
        }), 1)
        return this.conteudos;
    }
}
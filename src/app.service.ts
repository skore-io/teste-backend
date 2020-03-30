import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  private contents = [];

  createContent(content): any[] {
    let result = this.contents.find(item => item.id === content.id);
    if(result){
      throw new HttpException('Id já existe', HttpStatus.BAD_REQUEST);
    }
    content.watched = false;
    this.contents.push(content)
    return this.contents;
  }

  getContentById(id:string){
    let idC = Number(id)
    let content = this.contents.find(item => item.id === idC);

    if(!content){
      throw new HttpException('não encontrado', HttpStatus.NOT_FOUND);
    }

    let date = Date.now();

    if(content.expires_at < date){
      content.expired = true;
    }else{
      content.expired = false;
    }

    var resultCnt = Object.assign({}, content);

    content.watched = true;
    return resultCnt;
  }

  setContentById(id:string, content:any){
    let idC = Number(id)
    let objIndex = this.contents.findIndex((obj => obj.id == id));
    if(objIndex < 0){
      throw new HttpException('não encontrado', HttpStatus.NOT_FOUND);
    }
    content.watched = false;

    this.contents.splice(objIndex, 1);
    this.contents.push(content)

    return this.contents[objIndex];
  }
  removeContentById(id:string){
    let idC = Number(id)
    let objIndex = this.contents.findIndex((obj => obj.id == id));
    if(objIndex < 0){
      throw new HttpException('não encontrado', HttpStatus.NOT_FOUND);
    }
    this.contents.splice(objIndex, 1);

    return this.contents;
  }
  
}

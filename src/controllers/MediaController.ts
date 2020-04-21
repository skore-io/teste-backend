import { Response } from '../model/Response';
import * as fs from 'fs';
let dateNow = new Date().getTime()

class MediaController {

  saveMedia = async (req, res) => {
    try {
      let data = await fs.readFileSync('db.json', 'utf-8');
      let id = req.body.id
        let content = JSON.parse(data)
        const verify = content.data.some(item => { if (item.id === id ) return item})
        
          if (verify === true) {
            
            return res.json(new Response(true, `Não foi possível realizar esta operação, id ${req.body.id} já existe`, null))
          
          } else {
            
            req.body.watched = null;
            req.body.expired = null;
            content.data.push(req.body)
            fs.writeFileSync('db.json', JSON.stringify(content))
            return res.json(new Response(false, "Operação realizada com sucesso", null))
          }
        
    } catch (e) {

      return res.json(new Response(true, `erro: ${e}`, null))

    }
  }

  getMedias = async (req, res) => {
    try {
      let data = await fs.readFileSync('db.json', 'utf8');
      let id = parseInt(req.params.id)
      let content = JSON.parse(data)
      let media = await content.data.filter(async item => {

        if (item.id === id) {

          const expired = await this.calculateExpired(item.expires_at)

          item.expired = expired
          item.watched = true

          fs.writeFileSync('db.json', JSON.stringify(content))
          return res.json(new Response(false, 'Operação realizada', item))
        }
      })

      if(media.length <= 0){
        return res.json(new Response(false, 'Objeto com esse id não localizado', null))
      }

    } catch (e) {

      return res.json(new Response(true, `erro: ${e}`, null))

    }
  }

  updateMedia = async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      let data = await fs.readFileSync('db.json', 'utf8')
      let content = JSON.parse(data)

      content.data.forEach((item, index) => {
        if (item.id === id) {
          content.data[index] = req.body
          content.data[index].watched = false

          return content
        }
      })

      fs.writeFileSync('db.json', JSON.stringify(content))
      return res.json(new Response(false, "Objeto atualizado com sucesso", null))

    } catch (e) {

      return res.json(new Response(true, `erro: ${e}`, null))

    }
  }

  deleteMedia = async (req, res) => {
    try {
      let id = parseInt(req.params.id)
      let data = await fs.readFileSync('db.json', 'utf8')
      let content = JSON.parse(data);
      content.data.map((item, index) => {        
        if (item.id === id) {
          return content.data.splice(index, 1)
        }
      })
      
      fs.writeFileSync('db.json', JSON.stringify(content))
      return res.json(new Response(false, "Objeto excluído com sucesso", null))

    } catch (e) {

      return res.json(new Response(true, `erro: ${e}`, null))

    }
  }

  calculateExpired = async (dateMedia) => {

    if (dateMedia < dateNow) {
      return true
    } else {
      return false
    }
  }

}

export default new MediaController()
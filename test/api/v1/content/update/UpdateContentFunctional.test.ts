import * as request from 'supertest';
import { API_URL, BASIC_BODY } from '../../../../constants/constants'

const RESOURCE_URL = `${API_URL}/v1/content`

beforeAll(() => {
    request(RESOURCE_URL).post('create')
        .send(BASIC_BODY).expect(201, {...BASIC_BODY, watched: false, expired: false})
})

describe('UpdateContent', () => {
    
    it('should throw an error because not exist a content with id 0', () => {
        request(RESOURCE_URL).post('update')
            .send({...BASIC_BODY, id: 0}).expect(500, { error: "Objeto inválido para atualização" })
    })

    it('should update a existing content', () => {
        request(RESOURCE_URL).post('update')
            .send({...BASIC_BODY, media_type: 'doc'}).expect(200, 
                {...BASIC_BODY, media_type: 'doc'}
            )
    })
});


import * as request from 'supertest';
import { API_URL, BASIC_BODY } from '../../../../constants/constants'

const RESOURCE_URL = `${API_URL}/v1/content`

beforeAll(() => {
    request(RESOURCE_URL).post('create')
        .send(BASIC_BODY).expect(201, {...BASIC_BODY, watched: false, expired: false})
})

describe('DeleteContent', () => {
    
    it('should throw an error because not exist a content with id 0', () => {
        request(RESOURCE_URL).delete('delete/0')
            .expect(500, { error: "Objeto inválido para remoção" })
    })

    it('should update a existing content', () => {
        request(RESOURCE_URL).delete('delete/0')
            .expect(200, { response: "Objeto removido com sucesso." })
    })
});


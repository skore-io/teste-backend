import * as request from 'supertest';
import { API_URL, BASIC_BODY } from '../../../../constants/constants'

describe('ListContent', () => {
    const RESOURCE_URL = `${API_URL}/v1/content`
    
    request(RESOURCE_URL).post('create').send(BASIC_BODY)
    request(RESOURCE_URL).post('create').send({...BASIC_BODY, id: 2, name: "Design Patterns"})

    it('should list existing contents', () => {
        request(RESOURCE_URL).post('create')
            .send(BASIC_BODY).expect(200, 
                { response: [
                    {...BASIC_BODY, watched: false, expired: false},
                    {...BASIC_BODY, id: 2, name: "Design Patterns", watched: false, expired: false}
                ]
            })
    })
});


import * as request from 'supertest';
import { API_URL, BASIC_BODY } from '../../../../constants/constants'

describe('CreateContent', () => {
    const RESOURCE_URL = `${API_URL}/v1/content`
    
    it('should create a new content', () => {
        request(RESOURCE_URL).post('create')
            .send(BASIC_BODY).expect(201, {...BASIC_BODY, watched: false, expired: false})
    });

    it('should not create new content with existing id', () => {
        request(RESOURCE_URL).post('create')
            .send(BASIC_BODY).expect(500, { error: "Id inválido" })
    })
});


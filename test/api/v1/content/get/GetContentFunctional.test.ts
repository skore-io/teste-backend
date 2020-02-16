import * as request from 'supertest';
import { API_URL, BASIC_BODY } from '../../../../constants/constants'

describe('GetContent', () => {
    const RESOURCE_URL = `${API_URL}/v1/content`

    it('should list existing contents', () => {
        // request(RESOURCE_URL).post('create').send(BASIC_BODY)
        // await request(RESOURCE_URL).get('0').expect(200)
    })
});


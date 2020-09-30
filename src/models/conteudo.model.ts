export class Conteudo {
 
    constructor(
        public id: number,
        public name: string,
        public duration: number,
        public provider: string,
        public media_type: string,
        public provider_id: string,
        public expires_at: Date,
        public watched: boolean,
        public expired: boolean
    ) {}
}
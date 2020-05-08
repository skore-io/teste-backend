import {MigrationInterface, QueryRunner} from "typeorm";

export class Media1588914401071 implements MigrationInterface {
    name = 'Media1588914401071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" integer NOT NULL, "name" character varying NOT NULL, "duration" integer NOT NULL, "provider" character varying NOT NULL, "media_type" character varying NOT NULL, "provider_id" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, "watched" boolean NOT NULL DEFAULT false, "expired" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`, undefined);
    }

}

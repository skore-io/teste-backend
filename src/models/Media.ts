import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsString, IsNumber, IsOptional } from "class-validator";

@Entity()
export class Media {

    @IsOptional()
    @IsNumber()
    @PrimaryColumn()
    id: number;

    @IsString()
    @Column()
    name: string;

    @IsNumber()
    @Column()
    duration: number;

    @IsString()
    @Column()
    provider: string;

    @IsString()
    @Column()
    media_type: string;

    @IsString()
    @Column()
    provider_id: string;

    @IsNumber()
    @Column("timestamp")
    expires_at: Date;

    @Column({ default: false })
    watched: boolean;

    @Column({ default: false })
    expired: boolean;

}
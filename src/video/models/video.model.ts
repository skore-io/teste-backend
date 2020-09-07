import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MediaTypeEnum } from '../enum/media-type.enum'
import { Expose, Transform } from 'class-transformer'

@Entity('videos')
export class VideoModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  duration: number

  @Column()
  provider: string

  @Column()
  provider_id: string

  @Column()
  media_type: MediaTypeEnum

  @Column({ type: 'timestamp' })
  @Transform(expires_at => expires_at.getTime())
  expires_at: Date

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  @Column({ type: 'boolean', default: false })
  watched: boolean

  @Expose()
  get expires(): boolean {
    const today = new Date()
    return today.getTime() > this.expires_at.getTime()
  }
}

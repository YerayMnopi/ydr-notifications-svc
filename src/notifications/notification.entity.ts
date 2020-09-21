import { Entity, Column } from "typeorm";
import { SlugeableEntity } from "ydr-nest-common";
import { IsUUID, IsDate, IsString, IsUrl } from 'class-validator';

@Entity('notifications')
export class Notification extends SlugeableEntity {

    @Column({ type: 'varchar', length: 255, nullable: true, default: null })
    @IsUUID()
    from: string;

    @Column({ type: 'varchar', length: 255 })
    @IsUUID()
    to: string;

    @Column({ type: 'date', name: 'read_at', nullable: true, default: null })
    @IsDate()
    readAt!: Date | null;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    text: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: null  })
    @IsUrl()
    link: string;
  
}
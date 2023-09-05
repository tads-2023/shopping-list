import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Lista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  estado: string;

  @OneToMany(() => Item, (item) => item.lista)
  items: Item[]
}
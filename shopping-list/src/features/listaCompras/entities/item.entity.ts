import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Produto } from '../../produto/produto.entity';
import { Lista } from './lista.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @ManyToOne(() => Produto, (produto) => produto.items, {
    eager: true
  })
  produto: Produto;

  @ManyToOne(() => Lista, (lista) => lista.items)
  lista: Lista;
}
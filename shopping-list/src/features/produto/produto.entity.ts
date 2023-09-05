import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne, 
  OneToMany
} from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { Item } from '../listaCompras/entities/item.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nota: string;

  @Column()
  preco: number;

  @Column({nullable: true})
  imagem: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  categoria: Categoria;

  @OneToMany(() => Item, (item) => item.produto)
  items: Item[]

}
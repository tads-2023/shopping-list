import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne 
} from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nota: string;

  @Column({nullable: true})
  imagem: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  categoria: Categoria;

}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaDto } from './categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepositoy: Repository<Categoria>,
  ) {}

  listar(): Promise<Categoria[]> {
    return this.categoriaRepositoy.find({});
  }

  criar(categoriaDto: CategoriaDto): Promise<Categoria> {
    let categoria = new Categoria();
    categoria.nome = categoriaDto.nome;
    return this.categoriaRepositoy.save(categoria);
  }
}
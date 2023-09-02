import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Categoria } from '../categoria/categoria.entity';


@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepositoy: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepositoy: Repository<Categoria>,
  ) {}

  listar(): Promise<Produto[]> {
    return this.produtoRepositoy.find({});
  }

  async criar(produtoDto): Promise<Produto> {
    let produto = new Produto();
    produto.nome = produtoDto.nome;
    produto.nota = produtoDto.nota;
    produto.imagem = produtoDto.imagem;
    produto.categoria = await this.categoriaRepositoy.findOneBy({id: produtoDto.categoriaId})

    return this.produtoRepositoy.save(produto);
  }
}
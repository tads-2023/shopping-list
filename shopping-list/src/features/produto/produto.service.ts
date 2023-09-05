import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Categoria } from '../categoria/categoria.entity';
import { ProdutoDto } from './produto.dto';


@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepositoy: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepositoy: Repository<Categoria>,
  ) {}

  listar(termo: string): Promise<Produto[]> {
    if(termo) {
      return this.produtoRepositoy.findBy({
        nome: Like(`%${termo}%`)
      });
    }
    return this.produtoRepositoy.find({});
  }

  detalhe(id: number): Promise<Produto> {
    return this.produtoRepositoy.findOneBy({id: id});
  }

  async criar(produtoDto: ProdutoDto): Promise<Produto> {
    let produto = new Produto();
    produto.nome = produtoDto.nome;
    produto.preco = produtoDto.preco;
    produto.nota = produtoDto.nota;
    produto.imagem = produtoDto.imagem;
    produto.categoria = await this.categoriaRepositoy.findOneBy({id: produtoDto.categoriaId})

    return this.produtoRepositoy.save(produto);
  }
}
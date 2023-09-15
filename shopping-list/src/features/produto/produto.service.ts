import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Categoria } from '../categoria/categoria.entity';
import { ProdutoDto } from './produto.dto';
import { Injector } from '@nestjs/core/injector/injector';
import { StripeService } from '../listaCompras/stripe.service';


@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepositoy: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepositoy: Repository<Categoria>,
    @Inject(StripeService)
    private readonly stripeService: StripeService
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

    const resposta = await this.stripeService.criarProduto(produto);
    console.log(resposta);
    produto.precoStripe = resposta.default_price;
    return this.produtoRepositoy.save(produto);
  }
}
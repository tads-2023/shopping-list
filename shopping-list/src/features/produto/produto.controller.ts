import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';
import { ProdutoDto } from './produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService
  ) {}

  @Get()
  listar(): Promise<Produto[]> {
    return this.produtoService.listar();
  }

  @Post()
  criar(@Body() produtoDto: ProdutoDto): Promise<Produto> {
    return this.produtoService.criar(produtoDto);
  }
}

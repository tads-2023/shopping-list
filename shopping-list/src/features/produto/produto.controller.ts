import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';
import { ProdutoDto } from './produto.dto';
import { Query } from '@nestjs/common/decorators';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService
  ) {}

  @Get()
  listar(@Query('termo') termo: string): Promise<Produto[]> {
    return this.produtoService.listar(termo);
  }

  @Get(":id")
  detalhe(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.detalhe(id);
  }

  @Post()
  criar(@Body() produtoDto: ProdutoDto): Promise<Produto> {
    return this.produtoService.criar(produtoDto);
  }
}

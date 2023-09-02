import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
import { CategoriaDto } from './categoria.dto';

@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly categoriaService: CategoriaService
  ) {}

  @Get()
  listar(): Promise<Categoria[]> {
    return this.categoriaService.listar();
  }

  @Post()
  criar(@Body() categoriaDto: CategoriaDto): Promise<Categoria> {
    return this.categoriaService.criar(categoriaDto);
  }
}

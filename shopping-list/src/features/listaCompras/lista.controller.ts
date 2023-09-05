import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { ItemDto } from './dtos/item.dto';
import { ListaDto } from './dtos/lista.dto';
import { Item } from './entities/item.entity';
import { Lista } from './entities/lista.entity';
import { ListaService } from './lista.service';

@Controller('lists-compras')
export class ListaController {
  constructor(
    private readonly listaService: ListaService
  ) {}

  @Post()
  criar(@Body() listaDto: ListaDto): Promise<Lista> {
    return this.listaService.criar(listaDto);
  }

  @Put(":id/completar")
  completar(@Param('id') id: number): Promise<Lista> {
    return this.listaService.completar(id);
  }

  @Put(":id/adicionar")
  adicionar(
    @Param('id') id: number, 
    @Body() itemDto: ItemDto
  ): Promise<Item> {
    return this.listaService.adicionarItem(id, itemDto);
  }
}

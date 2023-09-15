import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { ItemDto } from './dtos/item.dto';
import { ListaDto } from './dtos/lista.dto';
import { Item } from './entities/item.entity';
import { Lista } from './entities/lista.entity';
import { ListaService } from './lista.service';
import { StripeService } from './stripe.service';

@Controller('listas-compra')
export class ListaController {
  constructor(
    private readonly listaService: ListaService,
    private readonly stripeService: StripeService
  ) {}

  @Get()
  listar(): Promise<Lista[]> {
    return this.listaService.listar();
  }

  @Post()
  criar(@Body() listaDto: ListaDto): Promise<Lista> {
    return this.listaService.criar(listaDto);
  }

  @Put(":id/completar")
  completar(@Param('id') id: number): Promise<Lista> {
    return this.listaService.completar(id);
  }

  @Get(":id/checkout")
  async checkout(@Param('id') id: number) {
    const lista = await this.listaService.detalhes(id);
    return this.stripeService.criarSessaoCompra(lista);
  }

  @Put(":id/adicionar")
  adicionar(
    @Param('id') id: number, 
    @Body() itemDto: ItemDto
  ): Promise<Lista> {
    return this.listaService.adicionarItem(id, itemDto);
  }
}

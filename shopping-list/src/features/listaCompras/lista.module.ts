import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ListaController } from './lista.controller';
import { Lista } from './entities/lista.entity';
import { ListaService } from './lista.service';
import { Produto } from '../produto/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lista, Item, Produto])],
  controllers: [ListaController],
  providers: [ListaService],
})
export class ListaModule {}
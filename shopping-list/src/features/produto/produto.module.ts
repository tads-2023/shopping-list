import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Categoria } from '../categoria/categoria.entity';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { StripeService } from '../listaCompras/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria])],
  controllers: [ProdutoController],
  providers: [ProdutoService, StripeService],
})
export class ProdutoModule {}
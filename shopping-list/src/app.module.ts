import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './features/categoria/categoria.module';
import { ProdutoModule } from './features/produto/produto.module';
import { ListaModule } from './features/listaCompras/lista.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'shopping-list',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
    ListaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

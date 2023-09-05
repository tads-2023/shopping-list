import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { ListaDto } from './dtos/lista.dto';
import { Lista } from './entities/lista.entity';
import { ItemDto } from './dtos/item.dto';
import { Produto } from '../produto/produto.entity';

@Injectable()
export class ListaService {
  constructor(
    @InjectRepository(Lista)
    private readonly listaRepository: Repository<Lista>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) {}

  criar(listaDto: ListaDto): Promise<Lista> {
    let lista = new Lista();
    lista.nome = listaDto.nome;
    lista.estado = "pendente";

    return this.listaRepository.save(lista);
  }

  async completar(id: number): Promise<Lista> {
    let lista = await this.listaRepository.findOneBy({id: id});
    lista.estado = "completo";

    return this.listaRepository.save(lista);
  }

  async adicionarItem(id: number, itemDto: ItemDto): Promise<Item> {
    let lista = await this.listaRepository.findOneBy({id: id});
    let produto = await this.produtoRepository.findOneBy({id: itemDto.produtoId});
    if(!(lista && produto)) {
      throw new NotFoundException();
    }
    let item = new Item();
    item.quantidade = 1;
    item.produto = produto;
    item.lista = lista;

    return this.itemRepository.save(item);
  }
}
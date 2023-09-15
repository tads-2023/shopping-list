import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { Produto } from '../produto/produto.entity';
import { Lista } from './entities/lista.entity';

@Injectable()
export class StripeService {
  private stripe;
  constructor() {
    this.stripe = new Stripe('sk_test_51Nkc2ZHOwNCcko3ErMt5YhjtQm8wGOS4254BqLNGWSAz8ImvnDKJDg1Xjm50VqWlJooaNPbuZ1DbxN5Q85orB4cd006yLL7qhO', {
      apiVersion: '2023-08-16',
    });
  }

  async criarProduto(produto: Produto) {
    const stripeProduto = {
      name: produto.nome,
      default_price_data: {
        currency: "brl",
        unit_amount_decimal: produto.preco * 100
      }
    };

    return this.stripe.products.create(stripeProduto)
  }

  async criarSessaoCompra(lista: Lista) {
    const lineItems = lista.items.map((item) => {
      return {
        price: item.produto.precoStripe,
        quantity: item.quantidade
      }
    })

    console.log(this.stripe);
    const checkoutSession = await this.stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `http://localhost:5173/sucesso/${lista.id}`,
      cancel_url: `http://localhost:5173/falha/${lista.id}`
    });

    return checkoutSession;
  }
}
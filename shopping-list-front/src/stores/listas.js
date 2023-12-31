import { defineStore } from 'pinia'

export const useListasStore = defineStore('listas', {
  state: () => (
    {
      listaCompra: {},
      historico: [],
      checkoutUrl: ''
    }
  ),
  actions: {
    async criarLista(nome) {
      const resposta = await fetch("http://localhost:3000/listas-compra", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          nome: nome 
        })
      });
      
      this.listaCompra = await resposta.json();
      console.log(this.listaCompra);
    },

    async adicionarProduto(produtoId) {
      const resposta = await fetch(`http://localhost:3000/listas-compra/${this.listaCompra.id}/adicionar`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          produtoId: produtoId 
        })
      });

      this.listaCompra = await resposta.json();
      console.log(this.listaCompra);
    },

    async criarCheckout() {
      const request = await fetch(`http://localhost:3000/listas-compra/${this.listaCompra.id}/checkout`);
      const resposta = await request.json();
      console.log(resposta);
      this.checkoutUrl = resposta.url;
    }
  },
})
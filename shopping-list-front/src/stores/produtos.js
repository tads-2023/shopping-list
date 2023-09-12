import { defineStore } from 'pinia'

export const useProdutosStore = defineStore('produtos', {
  state: () => (
    { 
      produtos: [],
    }
  ),
  actions: {
    async listaProdutos() {
      const resposta = await fetch("http://localhost:3000/produtos");
      this.produtos = await resposta.json();
    },

    async pesquisarProdutos(termo) {
      const resposta = await fetch(`http://localhost:3000/produtos?termo=${termo}`);
      this.produtos = await resposta.json();
    }
  },
})
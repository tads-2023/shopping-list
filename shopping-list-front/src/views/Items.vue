<script setup>
import { onMounted, computed, ref } from 'vue';
import { useProdutosStore } from '../stores/produtos';
import { useListasStore } from '../stores/listas';

const produtosStore = useProdutosStore()
const listasStore = useListasStore()

const produtos = computed(() => produtosStore.produtos);
const termo = ref('');

const onSearch = () => {
  console.log(termo);
  produtosStore.pesquisarProdutos(termo.value);
};

const onAddProdutoToList = (produtoId) => {
  listasStore.adicionarProduto(produtoId);
} 

onMounted( () => {
  produtosStore.listaProdutos();
});

</script>


<template>
  <div>
    <h1>Lista de items</h1>
    <form @submit.prevent="onSearch">
      <input v-model="termo" type="text" name="termo">

      <button>Buscar</button>
    </form>

    <div>
      <div v-for="produto in produtos" :key="produto.id">
        {{ produto.nome }}

        <button @click="onAddProdutoToList(produto.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useListasStore } from '../stores/listas';

const store = useListasStore();

const modalAberto = ref(false);
const nomeLista = ref('');
const listaCompras = computed(() => store.listaCompra);

const handleShopModal = () => {
  modalAberto.value = !modalAberto.value;
}

const onListaFormSubmit = () => {
  store.criarLista(nomeLista.value);
  modalAberto.value = false;
};

</script>
<template>
  <div>
    <button @click="handleShopModal">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    </button>
    <el-dialog v-model="modalAberto" title="Shopping list">
      <div v-if="!listaCompras.id">
        <form @submit.prevent="onListaFormSubmit">
          <input v-model="nomeLista" type="text" name="nome">
          <button>Salvar</button>
        </form>
      </div>
      <div v-else>
        <h1>{{ listaCompras.nome }}</h1>
        <div v-for="item in listaCompras.items" :key="item.id">
          {{ item.produto.nome }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';

const produtos = ref([]);
const termo = ref('');

const onSearch = () => {
  console.log("adasdas");
  fetch(`http://localhost:3000/produtos?termo=${termo.value}`).then((resposta) => {
    return resposta.json();
  }).then((resposta) => {
    produtos.value = resposta;
    console.log(produtos.value);
  }).catch((e) => {
    console.log(e);
    alert("Deu ruim");
  })
};

onMounted( () => {
  fetch("http://localhost:3000/produtos").then((resposta) => {
    return resposta.json();
  }).then((resposta) => {
    produtos.value = resposta;
    console.log(produtos.value);
  }).catch((e) => {
    console.log(e);
    alert("Deu ruim");
  })
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

        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>